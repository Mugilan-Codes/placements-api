const {
  addDefaultColumns,
  referencesId,
  url,
  addAuthColumns,
} = require('../../lib/tableUtils');
const tableNames = require('../../constants/tableNames').default;

// table.engine('INNODB');
exports.up = async (knex) => {
  await Promise.all([
    knex.schema.createTable(tableNames.admin, (table) => {
      // table.increments('id').notNullable();
      table.increments().notNullable();
      addAuthColumns(table);
      addDefaultColumns(table);
    }),
    knex.schema.createTable(tableNames.course, (table) => {
      table.increments().notNullable();
      table.enu('degree', ['UG', 'PG']).notNullable().defaultTo('UG');
      table.string('course_name', 100).notNullable().unique();
      table.string('short_name', 15).notNullable();
      table.enu('type', ['R', 'SS']).notNullable().defaultTo('R');
      table.string('department', 100).notNullable();
      addDefaultColumns(table);
      table.unique(['short_name', 'type']);
    }),
    knex.schema.createTable(tableNames.listings, (table) => {
      table.increments().notNullable();
      table.string('title').notNullable().unique();
      table.string('description', 1000).notNullable();
      table.string('company_name').notNullable();
      table.date('start_date');
      table.date('deadline').notNullable();
      url(table, 'listing_url');
      table.float('tenth_mark', 5, 2).notNullable(); // TODO: Check Constraint for tenth_mark (>= 0 && <= 100)
      table.float('twelfth_mark', 5, 2).notNullable(); // TODO: Check Constraint for twelfth_mark (>= 0 && <= 100)
      table.float('grad_cgpa', 4, 2); // TODO: Check Constraint for GRAD_CGPA (>= 0 && <= 10)
      table.float('cgpa', 4, 2).notNullable(); // TODO: Check Constraint for CGPA (>= 0 && <= 10)
      table.integer('backlog_current').defaultTo(0); // TODO: Current Backlog should be less than or equal to Backlog History
      table.integer('backlog_history').defaultTo(0);
      addDefaultColumns(table);
    }),
  ]);

  await knex.schema.createTable(tableNames.student, (table) => {
    table.string('register_no', 15).primary();
    addAuthColumns(table);
    addDefaultColumns(table);
    // referencesId(table, 'course', false);
    referencesId(table, tableNames.course, false);
    table.string('token', 150);
    table.boolean('email_verfied').defaultTo(false);
    table.boolean('admin_verfied').defaultTo(false);
  });

  // TODO: Check Constraint for CGPA (>= 0 && <= 10)
  // TODO: Current Backlog should be less than or equal to Backlog History
  await knex.schema.createTable(tableNames.marks, (table) => {
    table.string('register_no', 15).primary();
    table.float('cgpa', 4, 2).notNullable();
    table.integer('backlog_current').defaultTo(0);
    table.integer('backlog_history').defaultTo(0);
    addDefaultColumns(table);
    table
      .foreign('register_no')
      .references('register_no')
      .inTable(tableNames.student)
      .onDelete('CASCADE');
  });

  // TODO: Check Constraint for tenth_mark (>= 0 && <= 100)
  // TODO: Check Constraint for twelfth_mark (>= 0 && <= 100)
  // TODO: Check Constraint for GRAD_CGPA (>= 0 && <= 10)
  // TODO: grad details only for PG students
  await knex.schema.createTable(tableNames.education, (table) => {
    table.string('register_no', 15).primary();
    table.string('tenth_board').notNullable();
    table.float('tenth_mark', 5, 2).notNullable();
    table.string('twelfth_board').notNullable();
    table.float('twelfth_mark', 5, 2).notNullable();
    table.string('grad_course');
    table.float('grad_cgpa', 4, 2);
    addDefaultColumns(table);
    table
      .foreign('register_no')
      .references('register_no')
      .inTable(tableNames.student)
      .onDelete('CASCADE');
  });
};

exports.down = async (knex) => {
  await Promise.all(
    [
      tableNames.admin,
      tableNames.course,
      tableNames.listings,
      tableNames.student,
      tableNames.marks,
      tableNames.education,
    ].map((tableName) => knex.schema.dropTableIfExists(tableName))
  );
};
