import { Role, router } from '../../utils';
import { authorize, validate } from '../../middleware';
import { schema } from '../../models';
import { Student } from '../../controllers';

router
  .get('/courses', Student.getAllCourses)
  .get('/', authorize(Role.Student), Student.getDetail)
  .post('/register', validate(schema.student.register), Student.register)
  .post('/login', validate(schema.student.login), Student.login)
  .get(
    '/:register_no',
    validate(schema.student.registerParam, 'params'),
    Student.getOne
  )
  .post(
    '/add/marks',
    [authorize(Role.Student), validate(schema.marks.add)],
    Student.addMarks
  )
  .post(
    '/add/education',
    [authorize(Role.Student), validate(schema.education.add)],
    Student.addEducation
  );

export default router;
