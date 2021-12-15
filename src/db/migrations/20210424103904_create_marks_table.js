import { addDefaultColumns } from '../../lib/tableUtils';
import tableNames from '../../constants/tableNames';

/**
 * @param {import('knex')} knex
 */
export function up(knex) {
  return knex.schema.createTable(tableNames.marks, (table) => {
    table.string('register_no', 15).primary();
    table.float('cgpa', 4, 2).notNullable(); // check constraint added in raw
    table.integer('active_backlog').defaultTo(0);
    table.integer('backlog_history').defaultTo(0);
    addDefaultColumns(knex, table);
    table
      .foreign('register_no')
      .references('register_no')
      .inTable(tableNames.student)
      .onDelete('CASCADE');
    table.engine('INNODB');
  });
}

export function down(knex) {
  return knex.schema.dropTable(tableNames.marks);
}
