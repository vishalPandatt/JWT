const user = require("../models/users");
const bcrypt = require("bcrypt");

async function createUser(userData){
    const { name, email, password, role } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = new user({
        name,
        email,
        password: hashedPassword,
        role: "customer"
    });
    const savedUser = await createdUser.save();
    return savedUser;
}; 

module.exports = {createUser};