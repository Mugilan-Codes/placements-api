import express from 'express';
import { Role } from '../../utils';
import { Admin } from '../../controllers';
import { authorize, validate } from '../../middleware';
import { schema } from '../../models';

const router = express.Router();

router
  .post('/register', validate(schema.admin.register), Admin.register)
  .post('/login', validate(schema.admin.login), Admin.login)
  .get('/', authorize(Role.Admin), Admin.getDetail)
  .get(
    '/course/:course_id',
    [authorize(Role.Admin), validate(schema.course.idParam, 'params')],
    Admin.getOneCourse
  )
  .post(
    '/course',
    [authorize(Role.Admin), validate(schema.course.add)],
    Admin.addCourse
  )
  .post(
    '/listing',
    [authorize(Role.Admin), validate(schema.listing.add)],
    Admin.addListing
  );

export default router;
