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
}

export default Education;
