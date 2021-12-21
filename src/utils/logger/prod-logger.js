import { format, createLogger, transports } from 'winston';
import 'winston-mongodb';

import { MONGO_URI } from '../../config/env';

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
    transports: [
      new transports.Console(),
      new transports.MongoDB({
        level: 'error',
        db: MONGO_URI,
        options: {
          useUnifiedTopology: true,
        },
        collection: 'server_error_logs',
        format: combine(timestamp(), json()),
      }),
      new transports.MongoDB({
        level: 'warn',
        db: MONGO_URI,
        options: {
          useUnifiedTopology: true,
        },
        collection: 'server_warn_logs',
        format: combine(timestamp(), json()),
      }),
      new transports.MongoDB({
        level: 'http',
        db: MONGO_URI,
        options: {
          useUnifiedTopology: true,
        },
        collection: 'server_http_logs',
        format: combine(timestamp(), json()),
      }),
      new transports.MongoDB({
        level: 'info',
        db: MONGO_URI,
        options: {
          useUnifiedTopology: true,
        },
        collection: 'server_info_logs',
        format: combine(timestamp(), json()),
      }),
    ],
  });
};

export default buildProdLogger;
