import { addDefaultColumns, url } from '../../lib/tableUtils';
import tableNames from '../../constants/tableNames';

/**
 * @param {import('knex')} knex
 */
export function up(knex) {
  return knex.schema.createTable(tableNames.listings, (table) => {
    table.increments('id').primary();
    table.string('title', 50).notNullable().unique();
    table.string('description', 1000).notNullable();
    table.string('company_name', 50).notNullable();
    table.date('start_date').notNullable();
    url(table, 'listing_url');
    table.float('tenth_percentage', 5, 2).notNullable(); // check constraint added in raw
    table.float('twelfth_percentage', 5, 2).notNullable(); // check constraint added in raw
    table.float('grad_percentage', 5, 2); // check constraint added in raw
    table.float('cgpa', 4, 2).notNullable(); // check constraint added in raw
    table.integer('active_backlog').notNullable().defaultTo(0);
    table.integer('backlog_history').notNullable().defaultTo(0);
    addDefaultColumns(knex, table);
    table.engine('INNODB');
  });
}

export function down(knex) {
  return knex.schema.dropTable(tableNames.listings);
}
