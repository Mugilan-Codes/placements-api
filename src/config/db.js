import knex from 'knex';
import { environment } from './env';
import config from '../knexfile';

const connection = knex(config[environment]);

export default connection;
