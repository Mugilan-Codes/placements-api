import { addDefaultColumns, addAuthColumns } from '../../lib/tableUtils';
import tableNames from '../../constants/tableNames';

/**
 * @param {import('knex')} knex
 */
export function up(knex) {
  return knex.schema.createTable(tableNames.student, (table) => {
    table.string('register_no', 15).primary();
    addAuthColumns(table);
    table.string('course_id', 15);
    addDefaultColumns(knex, table);
    table.string('verification_token', 100);
    table.boolean('email_verified').defaultTo(false);
    table.boolean('admin_verified').defaultTo(false);
    table.foreign('course_id').references('id').inTable(tableNames.course);
    table.engine('INNODB');
  });
}

export function down(knex) {
  return knex.schema.dropTable(tableNames.student);
}
