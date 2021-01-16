import express from 'express';
import { Role } from '../../utils';
import { authorize, validate } from '../../middleware';
import { schema } from '../../models';
import { Student } from '../../controllers';

const router = express.Router();

router
  .get('/all', authorize(Role.Admin), Student.getAll)
  .get('/courses', Student.getAllCourses)
  .post('/register', validate(schema.student.register), Student.register)
  .post('/login', validate(schema.student.login), Student.login)
  .get('/', authorize(Role.Student), Student.getDetail)
  .get('/listing', authorize(Role.Student), Student.getListings)
  .get('/listing/:list_id', authorize(Role.Student), Student.getOneListing)
  .put(
    '/',
    [authorize(Role.Student), validate(schema.student.update)],
    Student.updateDetail
  )
  .get(
    '/:register_no',
    [authorize(Role.Admin), validate(schema.student.registerParam, 'params')],
    Student.getOne
  )
  .post(
    '/marks',
    [authorize(Role.Student), validate(schema.marks.add)],
    Student.addMarks
  )
  .post(
    '/education',
    [authorize(Role.Student), validate(schema.education.add)],
    Student.addEducation
  );

export default router;
