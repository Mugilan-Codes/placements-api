import { StudentService } from '../services';
import { ApiError } from '../utils';

class StudentController {
  register = async (req, res, next) => {
    try {
      const student = await StudentService.register(req.body);

      if (student.err_msg) {
        return next(ApiError.conflict(student.err_msg));
      }

      res.json(student);
    } catch (err) {
      console.log('StudentController --> register');
      next(err);
    }
  };

  getAll = async (req, res, next) => {
    try {
      const students = await StudentService.getAll();

      res.json(students);
    } catch (err) {
      console.log('StudentController --> getAll');
      next(err);
    }
  };

  getOne = async (req, res, next) => {
    const { register_no } = req.params;
    try {
      const student = await StudentService.getOne(register_no);
      res.json(student);
    } catch (err) {
      console.log('StudentController --> getOne');
      next(err);
    }
  };
}

export default new StudentController();
