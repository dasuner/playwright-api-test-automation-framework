// src/utils/logger.ts
import winston from 'winston';

// Format date: YYYY-MM-DD
const getDateTime = () => {
  const now = new Date();
  return now.toISOString().replace(/[:.]/g, '-');
};

const dateTime = getDateTime();

const { combine, timestamp, printf, colorize, json, errors } = winston.format;

// Custom console format
const consoleFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level}]: ${stack || message}`;
});

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'debug', // control via env

  format: combine(
    timestamp(),
    errors({ stack: true }), // logs error stack
    json()
  ),

  transports: [
    // Console (colored)
    new winston.transports.Console({
      format: combine(colorize(), timestamp(), consoleFormat)
    }),

    // All logs
    new winston.transports.File({
      filename: `logs/app-${dateTime}.log`
    }),

    // Errors only
    new winston.transports.File({
      filename: `logs/error-${dateTime}.log`,
      level: 'error'
    }),

    // HTTP logs
    new winston.transports.File({
      filename: `logs/http-${dateTime}.log`,
      level: 'http'
    })
  ]
});