const mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
    username: { type: String, unique: true },
    mobileNo: { type: String, unique: true },
    role: { type: String },
    password: { type: String },
}));

module.exports = { User };