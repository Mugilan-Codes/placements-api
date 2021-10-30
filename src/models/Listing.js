import BaseModel from './BaseModel';
import tableNames from '../constants/tableNames';

class Listing extends BaseModel {
  static get tableName() {
    return tableNames.listings;
  }
}

export default Listing;
