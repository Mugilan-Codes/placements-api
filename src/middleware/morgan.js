import morgan from 'morgan';

import { NODE_ENV } from '../config';
import { logger } from '../utils';

const stream = {
  write: (message) => logger.http(message),
};

// const format = NODE_ENV === 'production' ? 'combined' : 'dev';
// const morganMiddleware = morgan(format, { stream });

const morganMiddleware = morgan('combined', { stream });

export default morganMiddleware;
