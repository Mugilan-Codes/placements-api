import { DB } from '../config';

class Student {
  tableName = 'student';

  add = async ({
    register_no,
    name,
    email,
    password,
    course_id,
    created_on,
    updated_on,
  }) => {
    await DB.insert({
      register_no,
      name,
      email,
      password,
      course_id,
      created_on,
      updated_on,
    }).into(this.tableName);

    return this.findById(register_no);
  };

  update = async (register_no, userFields) => {
    await DB(this.tableName).where({ register_no }).update(userFields);

    return this.findById(register_no);
  };

  findById = async (register_no) => {
    const result = (await DB(this.tableName).where({ register_no }))[0];

    return result;
  };

  findOne = async ({ register_no, email } = {}) => {
    let student;

    if (register_no) {
      student = await this.findById(register_no);
    }

    if (email) {
      student = (await DB(this.tableName).where({ email }))[0];
    }

    return student;
  };

  find = async () => {
    return await DB.select('register_no').from(this.tableName);
  };
}

export default new Student();
