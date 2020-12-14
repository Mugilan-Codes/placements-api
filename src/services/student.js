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

      const studentWithoutPassword = await this._returnWithoutPassword(user);

      return { studentWithoutPassword, authToken };
    } catch (err) {
      console.log(`${this.className} --> register`);
      if (err.sqlMessage) {
        throw new Error(err.sqlMessage);
      }
      throw new Error(err.message);
    }
  }

  // Helper Function to return values without password
  async _returnWithoutPassword(user) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
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
}

export default new StudentService();
