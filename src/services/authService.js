const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../middleware/authMiddleware");

// Signup Service: Register new user
async function createUser(userData) {
  const { name, email, password, role } = userData;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  // Hash password for security
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save new user
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    role: role || "customer",
  });

  const savedUser = await newUser.save();

  // Return user details (without password)
  return {
    id: savedUser._id,
    name: savedUser.name,
    email: savedUser.email,
    role: savedUser.role,
  };
}

// Login Service: Verify credentials & generate token
async function loginUser(email, password) {
  // Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid email or password");
  }

  // Compare input password with stored hashed password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  // Create JWT token payload
  const tokenPayload = {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  // Generate signed JWT token valid for 24 hours
  const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: "24h" });

  return {
    user: tokenPayload,
    token,
  };
}

module.exports = {
  createUser,
  loginUser,
};
