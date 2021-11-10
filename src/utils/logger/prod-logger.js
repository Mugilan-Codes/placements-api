import { format, createLogger, transports } from 'winston';

const { combine, timestamp, errors, json, label } = format;

const buildProdLogger = () => {
  return createLogger({
    level: 'http',
    format: combine(
      label({ label: 'prod' }),
      timestamp(),
      errors({ stack: true }),
      json()
    ),
    // defaultMeta: { service: 'user-service' }, // meta data
    transports: [new transports.Console()],
  });
};

export default buildProdLogger;
