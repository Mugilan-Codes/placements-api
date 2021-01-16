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

  updateDetail = async (req, res, next) => {
    const { user, body } = req;
    try {
      const student = await StudentService.updateStudent({ user, body });
      res.json(student);
    } catch (err) {
      console.log(`${this.className} --> updateDetail`);
      next(err);
    }
  };

  // todo: Needs to be email_verified and admin_verified to check the listings with eligibility
  getListings = async (req, res, next) => {
    try {
      const listings = await StudentService.getListings(req.user);

      res.json(listings);
    } catch (err) {
      console.log(`${this.className} --> getListings`);
      next(err);
    }
  };

  getOneListing = async (req, res, next) => {
    const {
      user: { sub },
      params: { list_id },
    } = req;
    try {
      const listing = await StudentService.getOneListing(sub, list_id);

      res.json(listing);
    } catch (err) {
      console.log(`${this.className} --> getOneListing`);
      next(err);
    }
  };
}

export default new StudentController();
