const express = require('express');
const emailRouter = require('./router/emailRouter');

const app = express();
const Port = 3000;

app.use(emailRouter);
app.use(express.json());

app.listen(Port, () => {
    console.log("Server is up on port " + Port);
})

module.exports = app;