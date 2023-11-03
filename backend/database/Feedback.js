const mongoose = require('mongoose');

const Feedback = mongoose.model('Feedback', new mongoose.Schema({
    district: { type: String },
    address: { type: String },
    description: { type: String },
}));

module.exports = { Feedback };