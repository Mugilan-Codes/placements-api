exports.up = (knex) => {
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
};

exports.down = (knex) => {
  return knex.schema.dropTable('listings');
};
