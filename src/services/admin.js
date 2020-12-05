import { Course } from '../models';

export const addCourseService = async (course) => {
  const { degree, type, short_name, course_name, department } = course;
  try {
    const course_id = `${degree}-${short_name}-${type}`.toLowerCase();

    let course = await Course.findById({ course_id });
    console.log({ course });

    if (course) {
      return { err_msg: 'Course Id Already Exists!' };
    }

    return await Course.addCourse({
      course_id,
      degree,
      type,
      short_name,
      course_name,
      department,
    });
  } catch (err) {
    console.log('Service --> addCourseService');
    next(err);
  }
};
