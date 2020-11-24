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

knex
  .raw('SELECT VERSION()')
  .then((version) => {
    console.log(version[0][0]);
  })
  .catch((err) => {
    console.log(err);
    throw err;
  })
  .finally(() => {
    knex.destroy();
  });

export default knex;
