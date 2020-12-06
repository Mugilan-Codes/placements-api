import { addCourseService } from '../services';
import { ApiError } from '../utils';

export const addCourseController = async (req, res, next) => {
  try {
    const course = await addCourseService(req.body);

    if (course.err_msg) {
      return next(ApiError.conflict(course.err_msg));
    }

    res.json({ course });
  } catch (err) {
    console.log('Controller --> addCourseController');
    next(err);
  }
};
