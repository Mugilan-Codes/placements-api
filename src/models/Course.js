import { DB } from '../config';

//todo: findOne - to find unique course exists already (course_id (or) short_name & type (or) course_name)
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

  findById = async ({ course_id }) => {
    const result = await DB(this.tableName).where({ course_id });

    return result[0];
  };
}

export default new Course();
