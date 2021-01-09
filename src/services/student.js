import { Course, Student, Mark, Education } from '../models';
import { bcryptPass, Role, token, isDifferent, isEmptyObject } from '../utils';

// todo: Add provision to add course separately (i.e. update a user)
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

  //? is this necessary ?
  async getAll() {
    try {
      const students = await Student.find();

      const studentRegisterNumbers = students.map((item) => item.register_no);

      const studentWithDetails = await Promise.all(
        studentRegisterNumbers.map(this.getOne)
      );

      return studentWithDetails;
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

      if (course_id !== null) {
        const courseInfo = await Course.findById(course_id);
        if (courseInfo) {
          resultObj['course'] = courseInfo;
        }
      }

      // Retrieve Mark & Education in similar way
      const markInfo = await Mark.findById(register_no);

      resultObj['mark'] = markInfo;

      const educatonInfo = await Education.findById(register_no);

      resultObj['education'] = educatonInfo;

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

  async addMarks({ user, body }) {
    const { sub: register_no } = user;
    const { cgpa, active_backlog, backlog_history } = body;
    try {
      // todo: Update only if there is a difference
      const newMarks = {
        register_no,
        cgpa,
        active_backlog,
        backlog_history,
        updated_on: new Date(),
      };
      let marks = await Mark.findById(register_no);
      if (!marks) {
        marks = await Mark.add(newMarks);
      } else {
        marks = await Mark.update(newMarks);
      }
      return marks;
    } catch (err) {
      console.log(`${this.className} --> addMarks`);
      throw new Error(err.message);
    }
  }

  async addEducation({ user, body }) {
    const { sub: register_no } = user;
    const {
      tenth_board,
      tenth_percentage,
      twelfth_board,
      twelfth_percentage,
      grad_course,
      grad_percentage,
    } = body;
    try {
      // todo: Update only if there is a difference
      const newEducation = {
        register_no,
        tenth_board,
        tenth_percentage,
        twelfth_board,
        twelfth_percentage,
        grad_course,
        grad_percentage,
        updated_on: new Date(),
      };
      let education = await Education.findById(register_no);
      if (!education) {
        education = await Education.add(newEducation);
      } else {
        education = await Education.update(newEducation);
      }
      return education;
    } catch (err) {
      console.log(`${this.className} --> addEducation`);
      throw new Error(err.message);
    }
  }

  // todo: Change Password
  // todo: Reset/Forgot Password

  async updateStudent({ user, body }) {
    const { sub: register_no } = user;
    const { name, email, course_id } = body;
    try {
      const student = await Student.findById(register_no);

      let userFields = {
        name,
        email,
        course_id,
      };

      const course = await Course.findById(course_id);

      // todo: Check for valid course_id
      if (!course) {
        userFields['course_id'] = undefined; // or null or ''
      }

      // todo: Refactor this
      Object.keys(userFields).forEach((key) => {
        if (!isDifferent(userFields[key], student[key])) {
          delete userFields[key];
        }
      });

      if (isEmptyObject(userFields)) {
        return { msg: 'No Changes' };
      }

      userFields['updated_on'] = new Date();

      const updateStud = await Student.update(register_no, userFields);

      return updateStud;
    } catch (err) {
      console.log(`${this.className} --> updateStudent`);
      throw new Error(err.message);
    }
  }
}

export default new StudentService();
