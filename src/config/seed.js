const User = require("../models/User");
const bcrypt = require("bcryptjs");

async function seedDefaultUsers() {
  try {
    const count = await User.countDocuments();
    if (count === 0) {
      console.log("Seeding default demo users...");
      const hashedPassword = await bcrypt.hash("password123", 10);

      await User.create([
        {
          name: "Test Customer",
          email: "test@example.com",
          password: hashedPassword,
          role: "customer",
        },
        {
          name: "Test Admin",
          email: "admin@example.com",
          password: hashedPassword,
          role: "admin",
        },
      ]);

      console.log("Demo users created successfully!");
      console.log("Customer: test@example.com / password123");
      console.log("Admin:    admin@example.com / password123");
    }
  } catch (error) {
    console.error("Error seeding default users:", error.message);
  }
}

module.exports = seedDefaultUsers;
