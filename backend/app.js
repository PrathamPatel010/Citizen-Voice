require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT;
const frontend_url = process.env.frontend_url;
const cors = require('cors');
const bcrypt = require('bcrypt');
const axios = require('axios');
const { connectDb } = require('./database/db');
const { User } = require('./database/User');
const accountSid = 'AC6eb88ecb0c4fb4520de78ed6a3ba2a35';
const authToken = 'bc62a120a0d8a4d06196a1364a4d99e3';
const client = require('twilio')(accountSid, authToken);
const API_KEY = process.env.API_KEY;

// middlewares
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const corsOption = {
    origin: frontend_url,
    credentials: true,
};
app.use(cors(corsOption));

// app init
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

// Home Route
app.get('/', (req, res) => {
    res.send(`<h1>CitizenVoice Backend is up & running</h1>`);
})

app.post('/api/register', async(req, res) => {
    try {
        let { mobileNo } = req.body;
        const otp = Math.floor(100000 + Math.random() * 900000);
        console.log(`Mobile No: ${mobileNo}`);
        console.log('Generated OTP:', otp);

        // otp sending logic
        const message = `${otp}`;
        const smsData = {
            message: message,
            language: 'english',
            route: 'p',
            numbers: mobileNo
        };
        await axios.post('https://www.fast2sms.com/dev/bulkV2', smsData, {
            headers: {
                Authorization: API_KEY
            }
        });
        // const message = await client.messages.create({
        //     body: `OTP is ${otp} for CitizenVoice account verification`,
        //     from: process.env.twillio_no,
        //     to: `+91${mobileNo}`
        // });
        res.json({ status: 200, message: 'OTP sent to your mobile number', code: otp });
    } catch (err) {
        console.log(err.message);
    }
});

app.post('/api/createUser', async(req, res) => {
    const { username, mobileNo, role, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, mobileNo, role, password: hashedPassword });
    res.json({ status: 200, message: 'Account created successfully!!' });
});

app.post('/api/login', async(req, res) => {
    const { username, password } = req.body;
    const findUser = await User.findOne({ username });
    const passOk = await bcrypt.compare(password, findUser.password);
    if (passOk) {
        res.json({ message: 'Success!!' });
    }
})