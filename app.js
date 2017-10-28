// Main resource for PostgreSQL/Node.js/Express REST API
// https://scotch.io/tutorials/getting-started-with-node-express-and-postgres-using-sequelize

const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./server/log');
const app = express();

logger.verbose('express app initialized');
logger.verbose('logging initialized');

// set morgan write stream to winston logging
// https://stackoverflow.com/questions/27906551/node-js-logging-use-morgan-and-winston
// http://tostring.it/2014/06/23/advanced-logging-with-nodejs/
app.use(require("morgan")("short", { "stream": logger.stream }));
logger.verbose('morgan -> winston initialized');

// body-parser middleware for json & urlencoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
logger.verbose('body-parser initialized');

// use router to api
const ApiRoutes = require('./server/routes');
app.use('/api', ApiRoutes);

// logs api endpoints
const routeNameParser = require('./server/log/route-name-parser');
logger.verbose(`/api/<routes> established: ${routeNameParser.listAllLogStr(ApiRoutes.stack)}`);

app.use(['*','/api'], (req, res) => res.status(200).json({
    msg: 'Welcome. Please refer to /api/<routes>, where <routes> are the following to access functionalities',
    routes: routeNameParser.listAllJson(ApiRoutes.stack)
}));

module.exports = app;

logger.silly('Startup looks good so far! :)');