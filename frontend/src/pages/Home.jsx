import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrashAlt } from "react-icons/fa";
import logo from "../assets/mini-logo.png";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null); // Store user data (name, email)

  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();

  // Fetch notes from the backend
  useEffect(() => {
    const fetchNotes = async () => {
      if (!token) {
        console.error("No token found, please login.");
        navigate("/");
        return;
      }
      try {
        setLoading(true);
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/notes`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setNotes(response.data || []);
      } catch (error) {
        setError("Failed to load notes. Please try again later.");
        console.error("Error fetching notes:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchUserData = async () => {
      if (!token) {
        console.error("No token found, please login.");
        navigate("/");
        return;
      }
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data); // Set user data (name, email)
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to fetch user data.");
      }
    };

    fetchNotes();
    fetchUserData();
  }, [token, navigate]);

  const handleAddNote = async () => {
    if (note.trim()) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/notes`,
          { content: note },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Create a new note object from the response
        const newNote = {
          id: response.data._id, // Use the '_id' from the response
          content: response.data.content,
        };

        setNotes((prevNotes) => [...prevNotes, newNote]);
        setNote(""); // Clear the input field
        setShowModal(false); // Close the modal
      } catch (error) {
        console.error("Error adding note:", error);
        setError("Failed to add the note. Please try again.");
      }
    }
  };

  // Delete a note
  const handleDeleteNote = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
      setError("Failed to delete the note. Please try again.");
    }
  };

  // Handle sign out
  const handleSignOut = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center p-4 mb-6">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-8 w-8 mr-2" />
          <h1 className="text-black text-2xl font-semibold">Dashboard</h1>
        </div>
        <button
          className="text-blue-500 font-medium underline"
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-lg mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-2">Welcome, {user?.name || "User"}!</h2>
          <p className="text-gray-600 text-sm">Email: {user?.email || "Loading..."}</p>
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-md mb-6">
            {error}
          </div>
        )}

        {/* Create Note Button */}
        <button
          className="bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-600 w-full mb-6"
          onClick={() => setShowModal(true)}
        >
          Create Note
        </button>

        {/* Notes Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Notes</h3>
          {loading ? (
            <p>Loading...</p>
          ) : notes.length > 0 ? (
            <div className="space-y-4">
              {notes.map((note) => (
                <div
                  key={note._id}
                  className="flex justify-between items-center bg-gray-100 hover:bg-gray-200 p-3 rounded-lg shadow-md"
                >
                  <p>{note.content}</p>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteNote(note._id)}
                    aria-label="Delete note"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p>No notes available. Create your first note!</p>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Create a New Note</h2>
            <textarea
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Enter your note here..."
            />
            <div className="flex justify-end mt-4">
              <button
                className="bg-gray-300 text-black py-2 px-4 rounded-md hover:bg-gray-400 mr-2"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                onClick={handleAddNote}
              >
                Add Note
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
