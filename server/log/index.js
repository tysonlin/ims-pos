// winston centralized logger/unhandledExceptionHandler init
// Resources:
// http://thisdavej.com/using-winston-a-versatile-logging-library-for-node-js/
// https://gist.github.com/vikas5914/cf568748ac89446e19ecd5e2e6900443
// https://github.com/winstonjs/winston

const { createLogger, format, transports  } = require('winston');
const { combine, timestamp, printf, colorize } = format;

const fs = require('fs');
const env = process.env.NODE_ENV || 'development';
const logLevel = process.env.LOG_LEVEL;
const logDir = process.env.LOG_DIR || './log';

if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }

const tsFormat = () => (new Date()).toLocaleTimeString();

const myFormat = printf(info => {
    return `${info.timestamp} [${info.level}]: ${info.message}`;
  });

const logger = createLogger({
    format: combine(colorize(), timestamp(), myFormat),
    transports: [
        new (transports.Console)({
          colorize: true,
          timestamp: tsFormat,
          level: logLevel? logLevel : env === 'development' ? 'silly' : 'info'
        }),
        new (transports.File)({
          filename: logDir + '/app.log',
          timestamp: tsFormat,
          level: logLevel? logLevel : env === 'development' ? 'debug' : 'info'
        })
      ],
    exceptionHandlers: [
        new (transports.File)({
            filename: logDir + '/unhandledExceptions.log',
            timestamp: tsFormat,
            prettyPrint: true
        }),
        new (transports.Console)({
          colorize: true,
          timestamp: tsFormat
        })
    ],
    exitOnError: false
});

// setup stream for morgan logging to winston
logger.stream = {
  write: function(message, encoding){
      logger.verbose(message);
  }
};

// Log error to console only if in dev env
// if(env === 'development'){
//   logger.exceptions.handle(
//     new (transports.Console)({
//       colorize: true,
//       timestamp: tsFormat
//     })
//   );
// }


// Extend logger object to properly log 'Error' types
var origLog = logger.error

logger.error = function (msg) {
  if (msg instanceof Error && env === 'development') {
    var args = Array.prototype.slice.call(arguments)
    args[1] = msg.stack
    origLog.apply(logger, args)
  } else {
    origLog.apply(logger, arguments)
  }
}

module.exports = logger;