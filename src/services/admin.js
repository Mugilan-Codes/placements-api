import { addCourse } from '../models/Course';

export const addCourseService = async (course) => {
  const { degree, type, short_name, course_name, department } = course;
  try {
    const course_id = `${degree}-${short_name}-${type}`.toLowerCase();

    return await addCourse({
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
