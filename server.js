const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const bodyParser = require("body-parser");
const postsRoutes = require("./routes/posts_route");

const mongoose = require('mongoose');
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
    console.log("Connected to the database");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.use("/posts", postsRoutes);


const initApp = () => {
    return new Promise(async (resolve, reject) => {
        await mongoose.connect(process.env.DB_CONNECT);
        resolve(app);
    })
}

module.exports = initApp;
