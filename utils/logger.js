//custom logs with winston

const { createLogger, format, transports } = require('winston');
const { label } = format;
const { combine, timestamp, printf, colorize, errors } = format;
const path = require('path');

// Simple, production-friendly Winston logger configuration.
// - Console transport with colorized output.
// - File transports for error and combined logs (rotates by maxFiles/maxsize).
// - Exposes `logger.stream.write` to plug into morgan if desired.

const logFormat = printf(({ level, message, label: lbl, timestamp, stack }) => {
    // prefer stack if present (for errors)
    const msg = stack || message;
    return `${timestamp} [${lbl || path.basename(process.mainModule && process.mainModule.filename || '')}] ${level}: ${msg}`;
});

const logger = createLogger({
    level: 'info',
    format: combine(
        label({ label: 'task-service' }),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        errors({ stack: true }), // to log error stack
        logFormat
    ),
    transports: [
        new transports.Console({
            format: combine(
                colorize(),
                logFormat
            )
        }),
        new transports.File({ filename: 'logs/error.log', level: 'error', maxsize: 5242880, maxFiles: 5 }),
        new transports.File({ filename: 'logs/combined.log', maxsize: 5242880, maxFiles: 5 }),
    ],
})

module.exports = logger;