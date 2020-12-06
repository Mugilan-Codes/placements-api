import { DB } from '../config';
class Course {
  tableName = 'course';

  addCourse = async ({
    course_id,
    degree,
    type,
    short_name,
    course_name,
    department,
  }) => {
    await DB.insert({
      course_id,
      degree,
      type,
      short_name,
      course_name,
      department,
    }).into(this.tableName);

    //! returning not supported by mysql in knex.js
    return course_id;
  };

  findById = async (course_id) => {
    const result = await DB(this.tableName).where({ course_id });

    return result[0];
  };

  findOne = async ({ course_id, course_name, short_name, type } = {}) => {
    let course;

    if (course_id) {
      course = this.findById(course_id);
    }

    if (course_name) {
      course = (await DB(this.tableName).where({ course_name }))[0];
    }

    if (short_name && type) {
      course = (await DB(this.tableName).where({ short_name, type }))[0];
    }

    return course;
  };
}

export default new Course();
