// SERVER CONFIGURATION

import express from 'express';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import path from 'path';

import { api_port } from './config';
import { setupDB } from './db';
import { errorHandler, logger } from './middleware';
import { ApiError } from './utils';
import mountRoutes from './routes';

const app = express();

// initialize knex & objection
setupDB();

// REF: https://youtu.be/yXEesONd_54
// Register View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

mountRoutes(app);

app.get('/', (req, res, next) => {
  res.render('pages/home');
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
