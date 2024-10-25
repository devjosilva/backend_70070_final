// src/utils/logger.js
import winston from 'winston';

// Configuración del logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
    ],
});

// Middleware para capturar errores
const errorLogger = (err, req, res, next) => {
    logger.error(`${err.message} - ${req.method} - ${req.url} - ${req.ip}`);
    next(err);
};

export { logger, errorLogger };
