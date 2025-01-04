const { createLogger, format, transports } = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const { combine, timestamp, printf, colorize, json } = format;

// Define custom log format
const customFormat = printf(({ level, message, timestamp }) => {
  return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
});

// Create Winston logger
const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    json() // Logs in JSON format for structured logging
  ),
  transports: [
    // Log to a rotating file
    new DailyRotateFile({
      filename: 'logs/app-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
    // Log errors to a separate file
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    // Log to console with colorized output
    new transports.Console({
      format: combine(colorize(), customFormat),
    }),
  ],
});

module.exports = logger;