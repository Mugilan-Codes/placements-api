import { Role, router } from '../../utils';
import { authorize, validate } from '../../middleware';
import { schema } from '../../models';
import { Student } from '../../controllers';

router
  .get('/', authorize(Role.Student), Student.getDetail)
  .post('/register', validate(schema.student.register), Student.register)
  .post('/login', validate(schema.student.login), Student.login)
  .get('/courses', authorize(Role.Student), Student.getAllCourses)
  .get(
    '/:register_no',
    validate(schema.student.registerParam, 'params'),
    Student.getOne
  )
  .post('/add/marks', validate(schema.marks.add), Student.addMarks);

export default router;
