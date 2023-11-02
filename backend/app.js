require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT;
const frontend_url = process.env.frontend_url;
const cors = require('cors');
const bcrypt = require('bcrypt');
const { connectDb } = require('./database/db');
const { User } = require('./database/User');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const corsOption = {
    origin: frontend_url,
    credentials: true,
};
app.use(cors(corsOption));

const startApp = async() => {
    try {
        await connectDb();
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        });
    } catch (err) {
        console.log(err.message);
    }
}
startApp();

app.get('/', (req, res) => {
    res.send(`<h1>CitizenVoice Backend is up & running</h1>`);
})

app.post('/api/register', (req, res) => {
    const { mobileNo } = req.body;
    console.log(mobileNo);
    const otp = Math.floor(100000 + Math.random() * 900000);
    console.log('Generated OTP:', otp);
    res.json({ status: 200, message: 'OTP sent to your mobile number', code: otp });
});

app.post('/api/createUser', async(req, res) => {
    const { username, mobileNo, role, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, mobileNo, role, password: hashedPassword });
    res.json({ status: 200, message: 'Account created successfully!!' });
});