import { Role, router } from '../../utils';
import { authorize, validate } from '../../middleware';
import { schema } from '../../models';
import { Student } from '../../controllers';

router
  .get('/', authorize(Role.Student), Student.getAll)
  .get('/courses', authorize(Role.Student), Student.getAllCourses)
  .get(
    '/:register_no',
    validate(schema.student.registerParam, 'params'),
    Student.getOne
  )
  .post('/register', validate(schema.student.register), Student.register)
  .post('/login', validate(schema.student.login), Student.login);

export default router;
