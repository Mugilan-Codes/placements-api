import { addDefaultColumns } from '../../lib/tableUtils';
import tableNames from '../../constants/tableNames';

/**
 * @param {import('knex')} knex
 */
export function up(knex) {
  return knex.schema.createTable(tableNames.education, (table) => {
    table.string('register_no', 15).primary();
    table.string('tenth_board', 30).notNullable();
    table.float('tenth_percentage', 5, 2).notNullable(); // check constraint added in raw
    table.string('twelfth_board', 30).notNullable();
    table.float('twelfth_percentage', 5, 2).notNullable(); // check constraint added in raw
    table.string('grad_course', 30);
    table.float('grad_percentage', 5, 2); // check constraint added in raw
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
  return knex.schema.dropTable(tableNames.education);
}
