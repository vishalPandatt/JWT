const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey123";

// Middleware to authenticate JWT token
function authenticateToken(req, res, next) {
  // 1. Extract Authorization header (Expected format: "Bearer <token>")
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  // 2. If no token provided, deny access
  if (!token) {
    return res.status(401).json({ message: "Access denied. Token missing." });
  }

  // 3. Verify the token signature
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach user payload to request object
    next(); // Pass control to the next handler
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token." });
  }
}

// Middleware to authorize specific roles (Authorization)
function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden. Insufficient permissions." });
    }
    next();
  };
}

module.exports = {
  authenticateToken,
  authorizeRoles,
  JWT_SECRET,
};
