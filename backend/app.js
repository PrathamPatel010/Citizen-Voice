require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT;


const app = express();
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.send(`<h1>CitizenVoice Backend is up & running</h1>`);
})