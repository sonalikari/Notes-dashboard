const Note = require("../models/Note");

exports.createNote = async (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ message: "Note is required." });
  }

  try {
    const note = await Note.create({ user: req.user.id, content }); // Make sure 'user' is the correct field in your Note model
    return res.status(201).json(note);
  } catch (error) {
    return res.status(500).json({ message: "Server error." });
  }
};

exports.getNotes = async (req, res) => {
  const userId = req.user.id;  // userId is obtained from req.user after the authMiddleware

  try {
    console.log('Fetching notes for user:', userId);
    const notes = await Note.find({ user: userId }); // Assuming 'user' is the field name in the Note model
    console.log('Notes found:', notes);

    if (notes.length === 0) {
      return res.status(404).json({ message: "No notes found." });
    }

    res.status(200).json(notes);
  } catch (error) {
    console.error('Error fetching notes:', error.message);
    res.status(500).json({ message: 'Failed to retrieve notes', error: error.message });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const noteId = req.params.id;  // Get the note ID from the route parameter

    const note = await Note.findById(noteId);
    if (!note) {
      return res.status(404).json({ message: "Note not found." });
    }

    // Ensure the user trying to delete the note is the owner
    if (note.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized action." });
    }

    // Using findByIdAndDelete to remove the note
    await Note.findByIdAndDelete(noteId);

    return res.json({ message: "Note deleted." });
  } catch (error) {
    console.error("Error deleting note:", error);
    return res.status(500).json({ message: "Server error." });
  }
};
