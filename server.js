const express = require('express');
const app = express();
const dotenv = require('dotenv').config();

const mongoose = require('mongoose');
mongoose.connect(process.env.DB_CONNECT);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
    console.log("Connected to the database");
});

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

const postsRoutes = require("./routes/posts_route");
app.use("/posts", postsRoutes);

module.exports = app;