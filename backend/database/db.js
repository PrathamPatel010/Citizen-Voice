require('dotenv').config();
const mongoose = require('mongoose');
const URL = process.env.DB_URL;
const connectDb = async() => {
    const conn = await mongoose.connect(URL);
    console.log(`Database connected: ${conn.connection.host}`);
}

module.exports = { connectDb };