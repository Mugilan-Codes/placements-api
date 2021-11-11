// knex migration helpers

export const addDefaultColumns = (table) => {
  // table.timestamp('created_at').defaultTo(knex.fn.now());
  table.timestamp('created_at', { precision: 6 }).defaultTo(knex.fn.now(6));
  table.timestamp('updated_at', { precision: 6 }).defaultTo(knex.fn.now(6));
  table.datetime('deleted_at', { precision: 6 }).defaultTo(knex.fn.now(6));
};

export const email = (table, columnName) => {
  return table.string(columnName, 254);
};
