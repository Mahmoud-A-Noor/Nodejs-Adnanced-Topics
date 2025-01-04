const winston = require('winston');
require('winston-daily-rotate-file');
const { combine, timestamp, json, errors } = winston.format;

// optional logging levels
const logLevels = {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    debug: 4,
    trace: 5,
  };


  // optional filters to log only specific levels
const errorFilter = winston.format((info, opts) => {
return info.level === 'error' ? info : false;
});

const infoFilter = winston.format((info, opts) => {
return info.level === 'info' ? info : false;
});


// optional if you want to rotate log files
// It is a transport that logs to a rotating file that is configurable based on date or file size, 
// while older logs can be auto deleted based on count or elapsed days.
const fileRotateTransport = new winston.transports.DailyRotateFile({
    filename: 'logs/combined-%DATE%.log',
    datePattern: 'YYYY-MM-DD', // controls how often the file should be rotated
    maxFiles: '14d', // log files that are older than 14 days are automatically deleted
});
// fired when a log file is created
fileRotateTransport.on('new', (filename) => {});
// fired when a log file is rotated
fileRotateTransport.on('rotate', (oldFilename, newFilename) => {});
// fired when a log file is archived
fileRotateTransport.on('archive', (zipFilename) => {});
// fired when a log file is deleted
fileRotateTransport.on('logRemoved', (removedFilename) => {});


// you can have more than 1 logger
exports.logger = winston.createLogger({
    levels: logLevels || winston.config.syslog.levels,
    level: 'info',
    exitOnError: false,
    format: combine(errors({ stack: true }), timestamp(), json()),
    transports: [
        new winston.transports.Console(),
        fileRotateTransport,
        new winston.transports.File({
            filename: 'logs/combined.log',
        }),
        new winston.transports.File({
            filename: 'logs/app-error.log',
            level: 'error',
            format: combine(errorFilter(), timestamp(), json()),
        }),
        new winston.transports.File({
            filename: 'logs/app-info.log',
            level: 'info',
            format: combine(infoFilter(), timestamp(), json()),
        }),
    ],
    exceptionHandlers: [
        new winston.transports.File({ filename: 'logs/exception.log' }),
    ],
    rejectionHandlers: [
        new winston.transports.File({ filename: 'logs/rejections.log' }),
    ],
});
