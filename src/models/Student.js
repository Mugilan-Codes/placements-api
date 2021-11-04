import BaseModel from './BaseModel';
import tableNames from '../constants/tableNames';

class Student extends BaseModel {
  static get tableName() {
    return tableNames.student;
  }

  static get idColumn() {
    return 'register_no';
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
