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
        collection: 'server_logs',
        format: combine(timestamp(), json()),
      }),
    ],
  });
};

export default buildProdLogger;
