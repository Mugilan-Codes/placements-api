import { AdminService } from '../services';
import { ApiError } from '../utils';

class AdminController {
  className = 'AdminController';

  register = async (req, res, next) => {
    try {
    } catch (err) {
      console.log(`${this.className} --> register`);
      next(err);
    }
  };

  addCourse = async (req, res, next) => {
    try {
      const course = await AdminService.addCourse(req.body);

      if (course.err_msg) {
        return next(ApiError.conflict(course.err_msg));
      }

      res.json({ course });
    } catch (err) {
      console.log(`${this.className} --> addCourse`);
      next(err);
    }
  };
}

export default new AdminController();
