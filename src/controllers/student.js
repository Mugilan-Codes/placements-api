import { StudentService } from '../services';
import { ApiError } from '../utils';

class StudentController {
  className = 'StudentController';

  register = async (req, res, next) => {
    try {
      const student = await StudentService.register(req.body);

      if (student.err_msg) {
        return next(ApiError.conflict(student.err_msg));
      }

      res.json(student);
    } catch (err) {
      console.log(`${this.className} --> register`);
      next(err);
    }
  };

  login = async (req, res, next) => {
    try {
      const student = await StudentService.login(req.body);

      if (student.err_msg) {
        return next(ApiError.unauthorized(student.err_msg));
      }

      res.json(student);
    } catch (err) {
      console.log(`${this.className} --> login`);
      next(err);
    }
  };

  getAll = async (req, res, next) => {
    try {
      const students = await StudentService.getAll();
      // const studentRegisterNumbers = students.map((item) => item.register_no);

      // const studentWithDetails = await Promise.all(
      //   studentRegisterNumbers.map(StudentService.getOne)
      // );

      res.json(students);
    } catch (err) {
      console.log(`${this.className} --> getAll`);
      next(err);
    }
  };

  getOne = async (req, res, next) => {
    const { register_no } = req.params;
    try {
      const student = await StudentService.getOne(register_no);
      if (student.err_msg) {
        return next(ApiError.notFound(student.err_msg));
      }
      res.json(student);
    } catch (err) {
      console.log(`${this.className} --> getOne`);
      next(err);
    }
  };

  getAllCourses = async (req, res, next) => {
    try {
      const courses = await StudentService.getAllCourses();
      res.json(courses);
    } catch (err) {
      console.log(`${this.className} --> getAllCourses`);
      next(err);
    }
  };

  addMarks = async (req, res, next) => {
    const { user, body } = req;
    try {
      const marks = await StudentService.addMarks({ user, body });
      res.json(marks);
    } catch (err) {
      console.log(`${this.className} --> addMarks`);
      next(err);
    }
  };

  addEducation = async (req, res, next) => {
    const { user, body } = req;
    try {
      const education = await StudentService.addEducation({ user, body });
      res.json(education);
    } catch (err) {
      console.log(`${this.className} --> addEducation`);
      next(err);
    }
  };

  getDetail = async (req, res, next) => {
    try {
      const detail = await StudentService.getOne(req.user.sub);
      res.json(detail);
    } catch (err) {
      console.log(`${this.className} --> getDetail`);
      next(err);
    }
  };
}

export default new StudentController();
