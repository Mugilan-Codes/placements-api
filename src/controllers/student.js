import { Student } from '../services';

class StudentController {
  register = async (req, res, next) => {
    console.log(req.body);
    res.json(req.body);
  };
}

export default new StudentController();
