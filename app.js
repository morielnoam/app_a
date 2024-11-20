const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const port = process.env.PORT;

const postsRoutes = require("./routes/posts_route");
app.use("/posts", postsRoutes);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});