const jwt = require("jsonwebtoken");
const User = require("../models/User");

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });

exports.signup = async (req, res) => {
  const { name, dob, email, password } = req.body;

  if (!name || !dob || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "Email already registered." });

    const user = await User.create({ name, dob, email, password });
    return res.status(201).json({ token: generateToken(user._id) });
  } catch (error) {
    return res.status(500).json({ message: "Server error." });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    return res.json({ token: generateToken(user._id) });
  } catch (error) {
    return res.status(500).json({ message: "Server error." });
  }
};

exports.getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("name email");
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: "Server error." });
  }
};
