// Main resources for PostgreSQL/Node.js/Express REST API
// https://scotch.io/tutorials/getting-started-with-node-express-and-postgres-using-sequelize
// https://codeburst.io/sequelize-migrations-setting-up-associations-985d29b61ee7

const express = require('express');
const bodyParser = require('body-parser');

// Main resources for passport/jwt authentication
// https://www.youtube.com/watch?v=uONz0lEWft0&list=PLillGF-RfqbZMNtaOXJQiDebNXjVapWPZ
const cors = require('cors');
const passport = require('passport');

const logger = require('./server/log');
const app = express();

logger.verbose('express app initialized');
logger.verbose('winston initialized');
logger.verbose(`log directory: '${process.env.LOG_DIR || './log'}'`);

// set morgan write stream to winston logging
// https://stackoverflow.com/questions/27906551/node-js-logging-use-morgan-and-winston
// http://tostring.it/2014/06/23/advanced-logging-with-nodejs/
app.use(require("morgan")("short", { "stream": logger.stream }));
logger.verbose('morgan -> winston initialized');

// CORS Middleware
app.use(cors());
logger.verbose('cors initialized');

// body-parser middleware for json & urlencoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
logger.verbose('body-parser initialized');

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
require('./server/auth')(passport);
logger.verbose('passport initialized');

// use router to api
const ApiRoutes = require('./server/routes');
app.use('/api', ApiRoutes);

// logs api endpoints
const routeNameParser = require('./server/log/route-name-parser');
logger.verbose(`/api/<routes> established: ${routeNameParser.listAllLogStr(ApiRoutes.stack)}`);

const UserRoutes = require('./server/routes/users');
app.use('/user', UserRoutes);

// logs user endpoints
logger.verbose(`/user/<routes> established: ${routeNameParser.listAllLogStr(UserRoutes.stack)}`);

const FallbackRoutes = require('./server/routes/fallbacks')(ApiRoutes)
app.use(FallbackRoutes);
logger.verbose('fallback routes established');

module.exports = app;

logger.silly('Startup looks good so far! :)');