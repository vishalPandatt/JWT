const express = require("express");
const authController = require("../controllers/authController");
const { authenticateToken, authorizeRoles } = require("../middleware/authMiddleware");

const router = express.Router();

// Protected User Route (requires valid JWT token)
router.get("/profile", authenticateToken, authController.getProfile);

// Protected Admin Route (requires valid JWT token AND admin role)
router.get("/admin", authenticateToken, authorizeRoles("admin"), (req, res) => {
  res.status(200).json({
    message: "Welcome to the Admin Secret Portal!",
    user: req.user,
  });
});

module.exports = router;
