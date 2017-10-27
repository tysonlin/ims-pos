const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();

// Anotate logger based on NODE_ENV
app.use(logger(process.env.NODE_ENV));

// body-parser middleware for json & urlencoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('*', (req, res) => res.status(200).json({
    msg: 'Welcome. Please use /api/<routes> to access main functionalities'
}));

module.exports = app;