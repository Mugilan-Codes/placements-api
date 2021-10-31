import { StudentService } from '../services';
import { ApiError } from '../utils';

const getFullUrl = (req) => {
  // http://localhost:5000/api/student/register
  const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  return fullUrl;
};

const getBaseUrl = (req) => {
  // http://localhost:5000
  const baseUrl = req.protocol + '://' + req.get('host');
  return baseUrl;
};

class StudentController {
  className = 'StudentController';

  register = async (req, res, next) => {
    try {
      const student = await StudentService.register(req.body, getBaseUrl(req));

      if (student.err_msg) {
        return next(ApiError.conflict(student.err_msg));
      }

      res.json(student);
    } catch (err) {
      console.log(`${this.className} --> register`);
      next(err);
    }
  };

  verify = async (req, res, next) => {
    const { token } = req.query;
    try {
      const emailVerification = await StudentService.verifyEmail(token);

      // TODO: Render a Successfull Email Verification Page if email is verified
      res.json(emailVerification);
    } catch (err) {
      console.log(`${this.className} --> verify`);
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

  // accessible only for admin
  getAll = async (req, res, next) => {
    try {
      const students = await StudentService.getAll();
      if (students.err_msg) {
        return next(ApiError.notFound(students.err_msg));
      }

      res.json(students);
    } catch (err) {
      console.log(`${this.className} --> getAll`);
      next(err);
    }
  };

  getAllStatus = async (req, res, next) => {
    try {
      const students = await StudentService.getAllStatus();
      if (students.err_msg) {
        return next(ApiError.notFound(students.err_msg));
      }

      res.json(students);
    } catch (err) {
      console.log(`${this.className} --> getAllStatus`);
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

  // TODO: Needs to be email_verified and admin_verified to check the listings with eligibility
  getListings = async (req, res, next) => {
    const { sub: register_no } = req.user;
    try {
      const listings = await StudentService.getListings(register_no);
      if (listings.err_msg) {
        return next(ApiError.notFound(listings.err_msg));
      }

      res.json(listings);
    } catch (err) {
      console.log(`${this.className} --> getListings`);
      next(err);
    }
  };

  getOneListing = async (req, res, next) => {
    const {
      user: { sub: register_no },
      params: { list_id },
    } = req;
    try {
      const listing = await StudentService.getOneListing(register_no, list_id);
      if (listing.err_msg) {
        return next(ApiError.notFound(listing.err_msg));
      }

      res.json(listing);
    } catch (err) {
      console.log(`${this.className} --> getOneListing`);
      next(err);
    }
  };
}

export default new StudentController();
