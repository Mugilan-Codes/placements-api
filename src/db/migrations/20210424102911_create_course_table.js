exports.up = (knex) => {
  return knex.schema.createTable('course', (table) => {
    table.string('id', 15).primary();
    table.enu('degree', ['UG', 'PG']).notNullable().defaultTo('UG');
    table.enu('type', ['R', 'SS']).notNullable().defaultTo('R');
    table.string('short_name', 25).notNullable();
    table.string('course_name', 75).notNullable().unique();
    table.string('department', 75).notNullable();
    table.timestamp('created_on', { precision: 6 }).defaultTo(knex.fn.now(6));
    table.timestamp('updated_on', { precision: 6 }).defaultTo(knex.fn.now(6));
    table.unique(['short_name', 'type']);
    table.engine('INNODB');
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('course');
};
