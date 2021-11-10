import { format, createLogger, transports, addColors } from 'winston';

const { printf, combine, timestamp, colorize, errors, label } = format;

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};

const logFormat = printf(({ level, message, timestamp, stack, label }) => {
  return `${timestamp} [${label}] ${level}: ${stack || message}`;
});

const buildDevLogger = () => {
  addColors(colors);

  return createLogger({
    level: 'debug',
    format: combine(
      colorize({ all: true }), // makes the entire line colored
      label({ label: 'dev' }),
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      errors({ stack: true }),
      logFormat
    ),
    transports: [new transports.Console()],
  });
};

export default buildDevLogger;
