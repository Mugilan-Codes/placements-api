import { Course } from '../models';

class AdminService {
  className = 'AdminService';

  addCourse = async (course) => {
    const { degree, type, short_name, course_name, department } = course;
    try {
      //! Change course_id to UUID instead of relying on correct entries for three fields
      let typeDefault = type || 'R';
      const course_id = `${degree}-${short_name}-${typeDefault}`.toLowerCase();
      console.log({ course_id });

      let course = await Course.findOne({ course_id });
      if (course) {
        return { err_msg: 'Course Id already exists!' };
      }

      course = await Course.findOne({ course_name });
      if (course) {
        return { err_msg: 'Course Name already exists!' };
      }

      course = await Course.findOne({ short_name, type: typeDefault });
      if (course) {
        return { err_msg: `${short_name} - ${typeDefault} already exists!` };
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
      console.log(`${this.className} --> addCourse`);
      if (err.sqlMessage) {
        throw new Error(err.sqlMessage);
      }
      throw new Error(err.message);
    }
  };
}

export default new AdminService();
