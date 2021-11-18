// knex migration helpers

// REVIEW: timestamp or datetime?
// REVIEW: deleted_at implementation?
export const addDefaultColumns = (knex, table) => {
  // table.timestamp('created_at').defaultTo(knex.fn.now());
  table.timestamp('created_at', { precision: 6 }).defaultTo(knex.fn.now(6));
  table.timestamp('updated_at', { precision: 6 }).defaultTo(knex.fn.now(6));
  // table.datetime('deleted_at');
};

export const url = (table, columnName) => {
  table.string(columnName, 2000);
};

export const referencesId = (
  table,
  tableName,
  notNullable = true,
  columnName = ''
) => {
  const definition = table
    .integer(`${columnName || tableName}_id`)
    .unsigned()
    .references('id')
    .inTable(tableName)
    .onDelete('cascade');

  if (notNullable) {
    definition.notNullable();
  }
  return definition;
};

export const addAuthColumns = (table) => {
  table.string('name', 50).notNullable();
  table.string('email', 254).notNullable().unique();
  table.string('password', 127).notNullable();
  // table.datetime('last_login');
};
