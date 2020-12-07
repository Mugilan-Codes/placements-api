import { Course, Student } from '../models';
import { bcryptPass } from '../utils';

class StudentService {
  async register(student) {
    const { register_no, name, email, password, course_id } = student;
    try {
      let student = await Student.findOne({ register_no });
      if (student) {
        return { err_msg: 'Student with Register Number already exists!' };
      }

      student = await Student.findOne({ email });
      if (student) {
        return { err_msg: 'Email ID already exists!' };
      }

      // Check for course only when course_id is given
      if (course_id) {
        const course = await Course.findById(course_id);
        if (!course) {
          return { err_msg: 'Course does not exist' };
        }
      }

      const hashedPassword = await bcryptPass.hash(password);

      const created_on = new Date();
      const updated_on = new Date();

      return await Student.add({
        register_no,
        name,
        email,
        password: hashedPassword,
        course_id,
        created_on,
        updated_on,
      });
    } catch (err) {
      console.log('StudentService --> register');
      if (err.sqlMessage) {
        throw new Error(err.sqlMessage);
      }
      throw new Error(err.message);
    }
  }

  async getAll() {
    try {
      const students = await Student.find();

      //todo: Also retrieve course details

      return students;
    } catch (err) {
      console.log('StudentService --> register');
      throw new Error(err.message);
    }
  }
}

export default new StudentService();
