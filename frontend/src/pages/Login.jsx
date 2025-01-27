import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import google from "../assets/google.png";
import sideImage from "../assets/image.png";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Basic validation
    if (!email || !password) {
      setError("Please fill in both fields.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Store the token in localStorage
        localStorage.setItem("authToken", data.token);
        alert("Login successful!");
        navigate("/home"); // Navigate to the home or dashboard page
      } else {
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  const handleNavigate = () => {
    navigate("/signup");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-md overflow-hidden">
        {/* Left Section: Form */}
        <div className="w-full sm:w-1/2 p-6 text-center">
          {/* Logo Section */}
          <div className="flex justify-center items-center gap-2 mb-4">
            <img src={logo} alt="Logo" className="w-20 h-10" />
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold mb-2">Sign In</h2>
          <p className="text-sm text-gray-500 mb-4">
            Please log in to continue to your account.
          </p>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-left text-sm mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-left text-sm mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Sign In button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-blue-500 text-white rounded-md font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          {/* Error Message */}
          {error && <p className="text-red-500 mt-2">{error}</p>}

          {/* Divider */}
          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="px-2 text-sm text-gray-500">or</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Google Sign In Button */}
          <button className="w-full flex items-center justify-center gap-2 py-2 bg-white border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100">
            Sign In with Google
            <img src={google} alt="Google Icon" className="w-5 h-5" />
          </button>

          {/* Footer */}
          <p className="text-sm text-gray-500 mt-6">
            Need an account?{" "}
            <span
              className="text-blue-500 underline cursor-pointer"
              onClick={handleNavigate}
            >
              Create one
            </span>
          </p>
        </div>

        {/* Right Section: Image */}
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

export default SignIn;
