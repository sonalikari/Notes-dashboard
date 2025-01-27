import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import google from "../assets/google.png";
import sideImage from "../assets/image.png";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token); // Store token in localStorage
        setSuccess(true);
        alert("Signup successful! Redirecting to the dashboard...");
        navigate("/home"); // Redirect to the home page
      } else {
        const error = await response.json();
        setError(error.message || "Signup failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred during signup. Please try again.");
      console.error("Signup Error:", err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white my-4">
      <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Left Section: Form */}
        <div className="w-full sm:w-1/2 p-8">
          <div className="flex justify-center items-center mb-4">
            <img src={logo} alt="Logo" className="w-20 h-10" />
          </div>

          <h2 className="text-2xl font-bold text-center mb-2">Sign up</h2>
          <p className="text-sm text-gray-500 text-center mb-4">
            Sign up to enjoy the features of our platform
          </p>

          {success ? (
            <div className="text-green-600 text-center mb-4">
              Registration successful! Please check your email for confirmation.
            </div>
          ) : null}

          {error ? (
            <div className="text-red-600 text-center mb-4">{error}</div>
          ) : null}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter Your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="dob" className="block text-sm font-medium mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                id="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter Your Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                OTP
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter OTP"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white rounded-md font-medium hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              Sign up
            </button>
          </form>

          <div className="flex items-center my-6">
            <hr className="flex-grow border-gray-300" />
            <span className="px-3 text-sm text-gray-500">or</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <button className="w-full flex items-center justify-center gap-2 py-2 bg-white border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100">
            <img src={google} alt="Google Icon" className="w-5 h-5" />
            Continue with Google
          </button>

          <p className="text-sm text-gray-500 mt-6 text-center">
            Already have an account?{" "}
            <a href="/" className="text-blue-500 underline">
              Sign in
            </a>
          </p>
        </div>

        <div className="hidden sm:block sm:w-1/2">
          <img
            src={sideImage}
            alt="Side Graphic"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
