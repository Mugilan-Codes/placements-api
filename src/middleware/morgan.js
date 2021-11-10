import morgan from 'morgan';

import { logger } from '../utils';

const stream = {
  write: (message) => logger.http(message),
};

const morganMiddleware = morgan('combined', { stream });

export default morganMiddleware;
