exports.up = function (knex) {
  knex.schema.raw(`
  ALTER TABLE
    marks
  ADD CONSTRAINT
    cgpa_is_between_0_and_10
  CHECK
    (cgpa >= 0 AND cgpa <= 10)
`);
};

exports.down = function (knex) {
  knex.schema.raw(`
  ALTER TABLE marks
  DROP CONSTRAINT cgpa_is_between_0_and_10
`);
};
