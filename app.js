// Main resource for PostgreSQL/Node.js/Express REST API
// https://scotch.io/tutorials/getting-started-with-node-express-and-postgres-using-sequelize

const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./server/log');
const app = express();

logger.verbose('express app initialized');
logger.verbose('logging initialized');

// body-parser middleware for json & urlencoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

logger.verbose('body-parser initialized');

const ApiRoutes = require('./server/routes');
app.use('/api', ApiRoutes);

logger.verbose('/api established');

app.get('*', (req, res) => res.status(200).json({
    msg: 'Welcome. Please use /api/<routes> to access main functionalities'
}));

logger.verbose('/* fallback established');

module.exports = app;