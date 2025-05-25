import winston, { format } from 'winston';

const { combine, timestamp, json, printf } = format;

const readableFormat = printf((info) => {
  const { timestamp, level, message, stack, ...meta } = info;
  return `${timestamp} ${level}: ${message}${
    stack ? `\n${stack}` : ''
  }${Object.keys(meta).length ? `\n${JSON.stringify(meta, null, 2)}` : ''}`;
});

const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'error' : 'debug',
  format: combine(
    timestamp(),
    json(),
    readableFormat,
  ),
  transports: [
    new winston.transports.Console({
      level: process.env.NODE_ENV === 'production' ? 'error' : 'debug',
    }),
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
    }),
  ],
});

export default logger;

