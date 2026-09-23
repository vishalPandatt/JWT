const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

// 1. Connect to Database
connectDB();

// 2. Setup Middlewares
app.use(cors());
app.use(express.json());

// 3. Mount Routes
app.get("/", (req, res) => {
  res.json({ message: "JWT Authentication & Authorization API is running!" });
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

// 4. Fallback route handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});