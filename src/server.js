import express from 'express';
import cors from 'cors';
import compression from 'compression';

import { api_port } from './config';
import { logger } from './middleware';

const app = express();

app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

app.get('/', (req, res, next) => {
  res.send('API Running...');
});

app.use((req, res) => {
  res.status(404).send('404 Not Found!');
});

app.listen(api_port, () => {
  console.log(
    `Server started on port ${api_port} -> http://localhost:${api_port}`
  );
});
