import Knex from 'knex';

import { host, user, password, database } from './env';

const options = {
  client: 'mysql2',
  connection: {
    host,
    user,
    password,
    database,
  },
};

const knex = Knex(options);

export default knex;
