exports.up = (knex) => {
  return knex.schema.createTable('student', (table) => {
    table.string('register_no', 15).primary();
    table.string('name', 50).notNullable();
    table.string('email', 50).notNullable().unique();
    table.string('password', 100).notNullable();
    table.string('course_id', 15);
    table.timestamp('created_on', { precision: 6 }).defaultTo(knex.fn.now(6));
    table.timestamp('updated_on', { precision: 6 }).defaultTo(knex.fn.now(6));
    table.string('verification_token', 100);
    table.boolean('email_verified').defaultTo('false');
    table.boolean('admin_verified').defaultTo('false');
    table.foreign('course_id').references('id').inTable('course');
    table.engine('INNODB');
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('student');
};
