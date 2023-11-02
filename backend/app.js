require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT;
const frontend_url = process.env.frontend_url;
const cors = require('cors');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const corsOption = {
    origin: frontend_url,
    credentials: true,
};
app.use(cors(corsOption));

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.send(`<h1>CitizenVoice Backend is up & running</h1>`);
})

app.post('/api/register', (req, res) => {
    const { username, mobileNo, role, password } = req.body;
    console.log(req.body);
    res.json({ username, mobileNo, role, password });
})