require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT;
const frontend_url = process.env.frontend_url;
const cors = require('cors');
const bcrypt = require('bcrypt');
const axios = require('axios');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { connectDb } = require('./database/db');
const { User } = require('./database/User');
const { Feedback } = require('./database/Feedback');
// const accountSid = '--can be added--';
// const authToken = '--can be added--';
// const client = require('twilio')(accountSid, authToken);
const API_KEY = process.env.API_KEY;
const secret = process.env.jwtSecret;

// middlewares
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
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
});

app.post('/api/register', async(req, res) => {
    try {
        const { username } = req.body;
        // check if user already exist
        const UserExist = await User.findOne({ username });
        if (UserExist) {
            return res.json({ status: 400, message: 'User Already Exist, You just need to login' });
        }

        // if not, then register the user
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
        res.json({ message: err.message });
    }
});

app.post('/api/createUser', async(req, res) => {
    try {
        const { username, mobileNo, role, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, mobileNo, role, password: hashedPassword });
        res.json({ status: 200, message: 'Account created successfully!!' });
    } catch (err) {
        console.log(err.message);
        res.json({ message: err.message });
    }
});

app.post('/api/login', async(req, res) => {
    try {
        const { username, password } = req.body;

        // if no user exist, this query will return result with rowCount=0
        const user = await User.findOne({ username });
        if (!user) {
            return res.json({ status: 404, message: 'No User Found, You need to register' });
        }

        // if user exist, it will return User Object.
        const hashedPassword = user.password;
        const passCheck = await bcrypt.compare(password, hashedPassword);

        // case: password does not match username
        if (!passCheck) {
            return res.json({ status: 501, message: 'Wrong Username OR password!!' });
        }

        // case: password matches username
        jwt.sign({ id: user._id, username: user.username }, secret, (err, token) => {
            if (err) {
                console.log(err.message);
                return;
            }
            res.cookie('token', token, { httpOnly: false, secure: true, sameSite: 'none' }).json({ status: 200, message: 'Success!!' });
        });
    } catch (err) {
        console.log(err.message);
        res.json({ message: err.message });
    }
});

// route for checking auth
app.get('/api/checkAuth', async(req, res) => {
    try {
        const isAuth = req.cookies.token ? true : false;
        if (!isAuth) {
            return res.json({ status: 404, message: 'No token found!' });
        }

        const payload = jwt.verify(req.cookies.token, secret);
        const username = payload.username;
        res.json({ status: 200, message: 'User verified', username });
    } catch (err) {
        console.log(err.message);
        res.json({ message: err.message });
    }
});

app.post('/api/addReview', async(req, res) => {
    try {
        const { district, address, review } = req.body;
        const feedback = await Feedback.create({ district, address, description: review });
        console.log(feedback);
        res.json({ status: 200, message: 'Feedback Sent Successfully!!' });
    } catch (err) {
        console.log(err.message);
        res.json({ message: err.message });
    }
});

app.get('/api/logout', async(req, res) => {
    try {
        const isAuth = req.cookies.token ? true : false;
        if (!isAuth) {
            return res.json({ status: 404, message: 'No Cookies found' });
        }
        res.clearCookie('token', { httpOnly: false, secure: true, sameSite: 'none' }).json({ status: 200, message: 'Logout successfull!!' });
    } catch (err) {
        console.log(err.message);
        res.json({ message: err.message });
    }
});

app.get('/api/feedbacks', async(req, res) => {
    try {
        const feedbacks = await Feedback.find({ __v: 0 }).select('_id district address description');
        res.json({ feedbacks, status: 200 });
    } catch (err) {
        console.log(err.message);
        res.json(err.message);
    }
})