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

  $beforeUpdate() {
    // TODO: use this in migrations - table.timestamp('created_on').defaultTo(knex.fn.now());
    // this.updated_on = this.$knex().fn.now();
    this.updated_on = new Date().toISOString().slice(0, 19).replace('T', ' ');
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
