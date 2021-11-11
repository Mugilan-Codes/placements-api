exports.up = (knex) => {
  return knex.schema.createTable('education', (table) => {
    table.string('register_no', 15).primary();
    table.string('tenth_board', 30).notNullable();
    table.float('tenth_percentage', 5, 2).notNullable(); // check constraint added in raw
    table.string('twelfth_board', 30).notNullable();
    table.float('twelfth_percentage', 5, 2).notNullable(); // check constraint added in raw
    table.string('grad_course', 30).notNullable();
    table.float('grad_percentage', 5, 2).notNullable(); // check constraint added in raw
    table.timestamp('created_on', { precision: 6 }).defaultTo(knex.fn.now(6));
    table.timestamp('updated_on', { precision: 6 }).defaultTo(knex.fn.now(6));
    table
      .foreign('register_no')
      .references('register_no')
      .inTable('student')
      .onDelete('CASCADE');
    table.engine('INNODB');
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('education');
};
