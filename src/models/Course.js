import BaseModel from './BaseModel';
import tableNames from '../constants/tableNames';

class Course extends BaseModel {
  static get tableName() {
    return tableNames.course;
  }
}

export default Course;
