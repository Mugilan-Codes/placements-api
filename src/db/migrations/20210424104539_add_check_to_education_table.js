exports.up = (knex) => {
  knex.schema.raw(`
    ALTER TABLE
      education
    ADD CONSTRAINT
      tenth_percentage_is_between_0_and_100
    CHECK
      (tenth_percentage >= 0 AND tenth_percentage <= 100)
  `);
  knex.schema.raw(`
    ALTER TABLE
      education
    ADD CONSTRAINT
      twelfth_percentage_is_between_0_and_100
    CHECK
      (twelfth_percentage >= 0 AND twelfth_percentage <= 100)
  `);
  knex.schema.raw(`
    ALTER TABLE
      education
    ADD CONSTRAINT
      grad_percentage_is_between_0_and_100
    CHECK
      (grad_percentage >= 0 AND grad_percentage <= 100)
  `);
};

exports.down = (knex) => {
  knex.schema.raw(`
    ALTER TABLE education
    DROP CONSTRAINT tenth_percentage_is_between_0_and_100
  `);
  knex.schema.raw(`
    ALTER TABLE education
    DROP CONSTRAINT twelfth_percentage_is_between_0_and_100
  `);
  knex.schema.raw(`
    ALTER TABLE education
    DROP CONSTRAINT grad_percentage_is_between_0_and_100
  `);
};
