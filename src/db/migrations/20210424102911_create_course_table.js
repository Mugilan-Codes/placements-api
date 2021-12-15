import tableNames from '../../constants/tableNames';
import { addDefaultColumns } from '../../lib/tableUtils';

export function up(knex) {
  return knex.schema.createTable(tableNames.course, (table) => {
    table.string('id', 15).primary();
    table.enu('degree', ['UG', 'PG']).notNullable().defaultTo('UG');
    table.enu('type', ['R', 'SS']).notNullable().defaultTo('R');
    table.string('short_name', 15).notNullable();
    table.string('course_name', 100).notNullable().unique();
    table.string('department', 100).notNullable();
    addDefaultColumns(knex, table);
    table.unique(['short_name', 'type']);
    table.engine('INNODB');
  });
}

export function down(knex) {
  return knex.schema.dropTable(tableNames.course);
}
