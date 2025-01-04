const morgan = require('morgan');
const logger = require('./logger');

// Define Morgan's custom token for logging request body
morgan.token('body', (req) => JSON.stringify(req.body));

// Morgan logging configuration
const morganMiddleware = morgan(
  ':method :url :status :response-time ms - :res[content-length] :body',
  {
    stream: {
      write: (message) => logger.info(message.trim()), // Forward logs to Winston
    },
  }
);

module.exports = morganMiddleware;
