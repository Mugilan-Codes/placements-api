// Update with your config settings.

// const { local_connection } = require('./config');

const local_connection = {
  host: 'localhost',
  user: 'mugil',
  password: 'Mugilan@23',
  database: 'placement_db',
};

// TODO: Import connections env variables from config
module.exports = {
  development: {
    client: 'mysql2',
    connection: local_connection,
    migrations: {
      directory: __dirname + '/knex/migrations',
    },
    seeds: {
      directory: __dirname + '/knex/seeds',
    },
  },

  // staging: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user: 'username',
  //     password: 'password',
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10,
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations',
  //   },
  // },

  production: {
    client: 'mysql2',
    connection: process.env.JAWSDB_URL,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: __dirname + '/knex/migrations',
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: __dirname + '/knex/seeds',
    },
  },
};
