const mongoose = require("mongoose");
const seedDefaultUsers = require("./seed");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/jwt_auth_db");
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    await seedDefaultUsers();
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
  }
};

module.exports = connectDB;
