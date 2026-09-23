const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/jwt");

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("Error connecting to MongoDB:", err);
}); 

module.exports = mongoose;