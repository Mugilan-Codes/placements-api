import BaseModel from './BaseModel';
import tableNames from '../constants/tableNames';

class Education extends BaseModel {
  static get tableName() {
    return tableNames.education;
  }

  static get idColumn() {
    return 'register_no';
  }

  static get idColumn() {
    return 'register_no';
  }

  $beforeUpdate() {
    // TODO: use this in migrations - table.timestamp('created_on').defaultTo(knex.fn.now());
    // this.updated_on = this.$knex().fn.now();
    this.updated_on = new Date().toISOString().slice(0, 19).replace('T', ' ');
  }
}

export default Education;
