exports.up = (knex) => {
  return knex.schema.createTable('admin', (table) => {
    table.increments('id').primary();
    table.string('name', 30).notNullable();
    table.string('email', 50).notNullable().unique();
    table.string('password', 100).notNullable();
    table.timestamp('created_on', { precision: 6 }).defaultTo(knex.fn.now(6));
    table.timestamp('updated_on', { precision: 6 }).defaultTo(knex.fn.now(6));
    table.engine('INNODB');
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('admin');
};
