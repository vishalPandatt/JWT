const authService = require("../services/authService");
const User = require("../models/User");

// Handle User Registration
async function signup(req, res) {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please provide name, email, and password." });
    }

    const user = await authService.createUser({ name, email, password, role });
    res.status(201).json({
      message: "User registered successfully!",
      user,
    });
  } catch (error) {
    res.status(400).json({ message: error.message || "Registration failed" });
  }
}

// Handle User Login
async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Please provide email and password." });
    }

    const result = await authService.loginUser(email, password);
    res.status(200).json({
      message: "Login successful!",
      user: result.user,
      token: result.token,
    });
  } catch (error) {
    res.status(400).json({ message: error.message || "Login failed" });
  }
}

// Handle Protected User Profile Fetch
async function getProfile(req, res) {
  try {
    // req.user was populated by authenticateToken middleware from the JWT payload
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  signup,
  login,
  getProfile,
};
