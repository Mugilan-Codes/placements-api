import express from 'express';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';

import { api_port } from './config';
import { errorHandler, logger } from './middleware';
import { ApiError } from './utils';
import mountRoutes from './routes';

const app = express();

app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

mountRoutes(app);

app.get('/', (req, res, next) => {
  res.send('API Running...');
});

app.use((req, res, next) => {
  next(ApiError.notFound());
});

app.use(errorHandler);

app.listen(api_port, () => {
  console.log(
    `Server started on port ${api_port} -> http://localhost:${api_port}`
  );
});
