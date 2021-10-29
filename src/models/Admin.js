import BaseModel from './BaseModel';
import tableNames from '../constants/tableNames';

class Admin extends BaseModel {
  static get tableName() {
    return tableNames.admin;
  }
}

export default Admin;
