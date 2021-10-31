import BaseModel from './BaseModel';
import tableNames from '../constants/tableNames';

class Student extends BaseModel {
  static get tableName() {
    return tableNames.student;
  }

  static get idColumn() {
    return 'register_no';
  }

  $beforeUpdate() {
    // TODO: use this in migrations - table.timestamp('created_on').defaultTo(knex.fn.now());
    // this.updated_on = this.$knex().fn.now();
    this.updated_on = new Date().toISOString().slice(0, 19).replace('T', ' ');
  }

  // static get relationMappings() {
  //   return {
  //     marks: {
  //       relation: BaseModel.HasOneRelation,
  //       modelClass: async () => await import('./Mark'),
  //       join: {
  //         from: 'student.register_no',
  //         to: 'marks.register_no',
  //       },
  //     },
  //   };
  // }
}

export default Student;
