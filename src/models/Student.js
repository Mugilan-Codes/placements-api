import BaseModel from './BaseModel';
import tableNames from '../constants/tableNames';

class Student extends BaseModel {
  static get tableName() {
    return tableNames.student;
  }

  static get idColumn() {
    return 'register_no';
  }

  static get relationMappings() {
    return {
      course: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: `Course`,
        join: {
          from: `${tableNames.student}.course_id`,
          to: `${tableNames.course}.id`,
        },
      },
      mark: {
        relation: BaseModel.HasOneRelation,
        modelClass: `Mark`,
        join: {
          from: `${tableNames.student}.register_no`,
          to: `${tableNames.marks}.register_no`,
        },
      },
      education: {
        relation: BaseModel.HasOneRelation,
        modelClass: `Education`,
        join: {
          from: `${tableNames.student}.register_no`,
          to: `${tableNames.education}.register_no`,
        },
      },
    };
  }
}

export default Student;
