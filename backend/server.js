const express = require('express');
const cors = require('cors');
const connectDB = require("./config/db");
const port = "5000";
const dotenv = require('dotenv').config();

const app = express();
connectDB();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', "PATCH"],
    optionsSuccessStatus: 200,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use("/", require("./routes/post.routes"));

app.listen(port, ()=> console.log(`listening on port ${port}`))