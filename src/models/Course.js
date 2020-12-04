import { DB } from '../config';

export const addCourse = async ({
  course_id,
  degree,
  type,
  short_name,
  course_name,
  department,
}) => {
  //! returning not supported by mysql in knex.js
  await DB.insert({
    course_id,
    degree,
    type,
    short_name,
    course_name,
    department,
  }).into('course');

  return course_id;
};
