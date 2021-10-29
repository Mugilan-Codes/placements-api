exports.up = function (knex) {
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
};

exports.down = function (knex) {
  return knex.schema.dropTable('marks');
};
