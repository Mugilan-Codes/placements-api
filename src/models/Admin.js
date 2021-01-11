import { DB } from '../config';

class Admin {
  tableName = 'admin';

  add = async ({ name, email, password }) => {
    await DB.insert({ name, email, password }).into(this.tableName);
    return await this.findIdByEmail(email);
  };

  findIdByEmail = async (email) => {
    const result = await DB(this.tableName).where({ email }).select('id');

    return result;
  };

  findById = async (id) => {
    const result = (await DB(this.tableName).where({ id }))[0];

    return result;
  };
}

export default new Admin();
