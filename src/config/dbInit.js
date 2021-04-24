import knex from './db';

// TODO: Put this inside knex/migrations

// REF: https://gist.github.com/NigelEarle/70db130cc040cc2868555b29a0278261 - Migrations & Seeding
knex.schema.hasTable('admin').then((exists) => {
  if (!exists) {
    return knex.schema.createTable('admin', (table) => {
      table.increments('id').primary();
      table.string('name', 30).notNullable();
      table.string('email', 50).notNullable().unique();
      table.string('password', 100).notNullable();
      table.timestamp('created_on', { precision: 6 }).defaultTo(knex.fn.now(6));
      table.timestamp('updated_on', { precision: 6 }).defaultTo(knex.fn.now(6));
      table.engine('INNODB');
    });
  }
});

knex.schema.hasTable('course').then((exists) => {
  if (!exists) {
    return knex.schema.createTable('course', (table) => {
      table.string('id', 15).primary();
      table.enu('degree', ['UG', 'PG']).notNullable().defaultTo('UG');
      table.enu('type', ['R', 'SS']).notNullable().defaultTo('R');
      table.string('short_name', 25).notNullable();
      table.string('course_name', 75).notNullable().unique();
      table.string('department', 75).notNullable();
      table.unique(['short_name', 'type']);
      table.engine('INNODB');
    });
  }
});

knex.schema.hasTable('student').then((exists) => {
  if (!exists) {
    return knex.schema.createTable('student', (table) => {
      table.string('register_no', 15).primary();
      table.string('name', 50).notNullable();
      table.string('email', 50).notNullable().unique();
      table.string('password', 100).notNullable();
      table.string('course_id', 15);
      table.timestamp('created_on', { precision: 6 }).defaultTo(knex.fn.now(6));
      table.timestamp('updated_on', { precision: 6 }).defaultTo(knex.fn.now(6));
      table.boolean('email_verified').defaultTo('false');
      table.boolean('admin_verified').defaultTo('false');
      table.foreign('course_id').references('id').inTable('course');
      table.engine('INNODB');
    });
  }
});

knex.schema.hasTable('marks').then((exists) => {
  if (!exists) {
    return knex.schema.createTable('marks', (table) => {
      table.string('register_no', 15).primary();
      table.float('cgpa', 4, 2).notNullable(); // check constraint added in raw
      table.integer('active_backlog').defaultTo(0);
      table.integer('backlog_history').defaultTo(0);
      table.timestamp('updated_on', { precision: 6 }).defaultTo(knex.fn.now(6));
      table
        .foreign('register_no')
        .references('register_no')
        .inTable('student')
        .onDelete('CASCADE');
      table.engine('INNODB');
    });
  }
});

// REF: https://gist.github.com/tukkajukka/45317518687d9fb20b86ccfe6a170614 - How to use check constraints with Knex.js and Postgres
knex.schema.raw(`
  ALTER TABLE
    marks
  ADD CONSTRAINT
    cgpa_is_between_0_and_10
  CHECK
    (cgpa >= 0 AND cgpa <= 10)
`);

knex.schema.hasTable('education').then((exists) => {
  if (!exists) {
    return knex.schema.createTable('education', (table) => {
      table.string('register_no', 15).primary();
      table.string('tenth_board', 30).notNullable();
      table.float('tenth_percentage', 5, 2).notNullable(); // check constraint added in raw
      table.string('twelfth_board', 30).notNullable();
      table.float('twelfth_percentage', 5, 2).notNullable(); // check constraint added in raw
      table.string('grad_course', 30).notNullable();
      table.float('grad_percentage', 5, 2).notNullable(); // check constraint added in raw
      table.timestamp('updated_on', { precision: 6 }).defaultTo(knex.fn.now(6));
      table
        .foreign('register_no')
        .references('register_no')
        .inTable('student')
        .onDelete('CASCADE');
      table.engine('INNODB');
    });
  }
});

knex.schema.raw(`
  ALTER TABLE
    education
  ADD CONSTRAINT
    tenth_percentage_is_between_0_and_100
  CHECK
    (tenth_percentage >= 0 AND tenth_percentage <= 100)
`);
knex.schema.raw(`
  ALTER TABLE
    education
  ADD CONSTRAINT
    twelfth_percentage_is_between_0_and_100
  CHECK
    (twelfth_percentage >= 0 AND twelfth_percentage <= 100)
`);
knex.schema.raw(`
  ALTER TABLE
    education
  ADD CONSTRAINT
    grad_percentage_is_between_0_and_100
  CHECK
    (grad_percentage >= 0 AND grad_percentage <= 100)
`);

knex.schema.hasTable('listings').then((exists) => {
  if (!exists) {
    return knex.schema.createTable('listings', (table) => {
      table.increments('id').primary();
      table.string('title', 50).notNullable().unique();
      table.string('description', 255).notNullable();
      table.string('company_name', 50).notNullable();
      table.date('start_date').notNullable();
      table.float('tenth_percentage', 5, 2).notNullable(); // check constraint added in raw
      table.float('twelfth_percentage', 5, 2).notNullable(); // check constraint added in raw
      table.float('grad_percentage', 5, 2).notNullable(); // check constraint added in raw
      table.float('cgpa', 4, 2).notNullable(); // check constraint added in raw
      table.integer('active_backlog').notNullable().defaultTo(0);
      table.integer('backlog_history').notNullable().defaultTo(0);
      table.timestamp('created_on', { precision: 6 }).defaultTo(knex.fn.now(6));
      table.timestamp('updated_on', { precision: 6 }).defaultTo(knex.fn.now(6));
      table.engine('INNODB');
    });
  }
});

knex.schema.raw(`
  ALTER TABLE
    listings
  ADD CONSTRAINT
    tenth_percentage_is_between_0_and_100
  CHECK
    (tenth_percentage >= 0 AND tenth_percentage <= 100)
`);
knex.schema.raw(`
  ALTER TABLE
    listings
  ADD CONSTRAINT
    twelfth_percentage_is_between_0_and_100
  CHECK
    (twelfth_percentage >= 0 AND twelfth_percentage <= 100)
`);
knex.schema.raw(`
  ALTER TABLE
    listings
  ADD CONSTRAINT
    grad_percentage_is_between_0_and_100
  CHECK
    (grad_percentage >= 0 AND grad_percentage <= 100)
`);
knex.schema.raw(`
  ALTER TABLE
    listings
  ADD CONSTRAINT
    cgpa_is_between_0_and_10
  CHECK
    (cgpa >= 0 AND cgpa <= 10)
`);
