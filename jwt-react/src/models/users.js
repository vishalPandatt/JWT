const mongoose = require("../configration/dbconfig");

const userSchema = new mongoose.Schema({
    name: string,
    email: string,
    password: string,
    role: {type: string, enum: ['user', 'admin'], default: 'customer'},
})


module.exports = mongoose.model('User', userSchema);