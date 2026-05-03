require("dotenv").config();

const userRoutes = require('./routes/UserRoute');
const whisperRoutes = require('./routes/WhisperRoute');

const express = require('express');
const cors = require('cors');
const db = require('./config/db');

const port = process.env.PORT;
const app = express();

// connect to database
db.connectDB();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        methods: "GET,POST,PUT,DELETE,PATCH",
        credentials: true
    })
);


// status
app.get('/status', (req, res) => {
    res.status(200).send({ status: "Server is running" });
})

// redirect /user to userRoutes
app.use("/api/users", userRoutes);

// redirect /score to scoreRoutes
app.use("/api/whispers", whisperRoutes);


app.listen(port, () => {
    console.log(`🚀 Server is running on PORT ${port}`);
})