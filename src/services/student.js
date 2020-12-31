import { user } from '../config/env';
import { Course, Student } from '../models';
import { bcryptPass, Role, token } from '../utils';

class StudentService {
  className = 'StudentService';

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

      const user = await Student.add({
        register_no,
        name,
        email,
        password: hashedPassword,
        course_id,
        created_on,
        updated_on,
      });

      const payload = {
        sub: user.register_no,
        role: Role.Student,
      };

      const authToken = token.sign(payload);
      const refreshToken = token.refresh.sign(payload);

      return { token: authToken, refreshToken };
    } catch (err) {
      console.log(`${this.className} --> register`);
      if (err.sqlMessage) {
        throw new Error(err.sqlMessage);
      }
      throw new Error(err.message);
    }
  }

  async login(student) {
    const { register_no, email, password } = student;
    try {
      const user = await Student.findOne({ register_no, email });
      if (!user) {
        return { err_msg: 'Invalid Credentials' };
      }

      const isMatch = await bcryptPass.compare(password, user.password);
      if (!isMatch) {
        return { err_msg: 'Invalid Credentials' };
      }

      const payload = {
        sub: user.register_no,
        role: Role.Student,
      };

      const authToken = token.sign(payload);
      const refreshToken = token.refresh.sign(payload);

      return { token: authToken, refreshToken };
    } catch (err) {
      console.log(`${this.className} --> login`);
      throw new Error(err.message);
    }
  }

  async getAll() {
    try {
      const students = await Student.find();

      //todo: Also retrieve course details

      return students;
    } catch (err) {
      console.log(`${this.className} --> getAll`);
      throw new Error(err.message);
    }
  }

  async getOne(register_no) {
    try {
      const studentInfo = await Student.findById(register_no);
      if (!studentInfo) {
        return { err_msg: 'Student Not Found' };
      }

      let { password, course_id, ...resultObj } = studentInfo;

      const courseInfo = await Course.findById(course_id);

      resultObj['course'] = courseInfo;

      // Retrieve Mark & Education in similar way

      return resultObj;
    } catch (err) {
      console.log(`${this.className} --> getOne`);
      throw new Error(err.message);
    }
  }

  async getAllCourses() {
    try {
      const courses = await Course.getAll();
      return courses;
    } catch (err) {
      console.log(`${this.className} --> getAllCourses`);
      throw new Error(err.message);
    }
  }
}

export default new StudentService();
