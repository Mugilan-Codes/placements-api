import Knex from 'knex';

import { host, user, password, database } from './env';

const knex = Knex({
  client: 'mysql2',
  connection: {
    host,
    user,
    password,
    database,
  },
  // useNullAsDefault: true,
});

export default knex;
