import { Course } from '../models';

export const add = async ({
  id,
  degree,
  type,
  short_name,
  course_name,
  department,
}) => {
  const addCourseResult = await Course.query().insert({
    id,
    degree,
    type,
    short_name,
    course_name,
    department,
  });

  return addCourseResult;
};

export const findById = async (id) => {
  const findByIdResult = await Course.query().findById(id);

  return findByIdResult;
};

export const deleteById = async (id) => {
  const deleteByIdResult = await Course.query().deleteById(id);

  return deleteByIdResult;
};

export const findOne = async ({ course_name, short_name, type } = {}) => {
  let course;

  if (course_name) {
    course = await Course.query().select().where({ course_name }).first();
  } else if (short_name && type) {
    course = await Course.query().select().where({ short_name, type }).first();
  }

  return course;
};

export const update = async (id, updateFields) => {
  const updateResult = await Course.query().patchAndFetchById(id, updateFields);

  return updateResult;
};

export const getAll = async () => {
  const getAllResult = await Course.query();

  return getAllResult;
};
