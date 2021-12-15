import tableNames from '../../constants/tableNames';
import { addAuthColumns, addDefaultColumns } from '../../lib/tableUtils';

export function up(knex) {
  return knex.schema.createTable(tableNames.admin, (table) => {
    table.increments('id').primary();
    addAuthColumns(table);
    addDefaultColumns(knex, table);
    table.engine('INNODB');
  });
}

export function down(knex) {
  return knex.schema.dropTable(tableNames.admin);
}
