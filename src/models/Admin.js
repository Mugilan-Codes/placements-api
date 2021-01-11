import { DB } from '../config';

class Admin {
  tableName = 'admin';

  add = async ({ name, email, password }) => {
    await DB.insert({ name, email, password }).into(this.tableName);
    return { name, email };
  };

  // todo: get ID by email

  findById = async (id) => {
    const result = (await DB(this.tableName).where({ id }))[0];

    return result;
  };
}

export default new Admin();
