import BaseModel from './BaseModel';
import tablesNames from '../constants/tableNames';

// TODO: relation mapping
class Mark extends BaseModel {
  static get tableName() {
    return tablesNames.marks;
  }

  static get idColumn() {
    return 'register_no';
  }

  // static get relationMappings() {
  //   return {
  //     student: {
  //       relation: BaseModel.BelongsToOneRelation,
  //       modelClass: async () => await import('./Student'),
  //       join: {
  //         from: 'marks.register_no',
  //         to: 'student.register_no',
  //       },
  //     },
  //   };
  // }
}

export default Mark;
