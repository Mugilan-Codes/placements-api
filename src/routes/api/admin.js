import express from 'express';
import { Role } from '../../utils';
import { Admin } from '../../controllers';
import { authorize, validate } from '../../middleware';
import { schema } from '../../models';

const router = express.Router();

// TODO: course - update, delete
// TODO: listing - update (schema validation)

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
  .put(
    '/course/:course_id',
    [authorize(Role.Admin), validate(schema.course.idParam, 'params')],
    Admin.updateOneCourse
  )
  .delete(
    '/course/:course_id',
    [authorize(Role.Admin), validate(schema.course.idParam, 'params')],
    Admin.deleteOneCourse
  )
  .post(
    '/listing',
    [authorize(Role.Admin), validate(schema.listing.add)],
    Admin.addListing
  )
  .get('/listing', authorize(Role.Admin), Admin.getAllListings)
  .get('/listing/:list_id', authorize(Role.Admin), Admin.getOneListing)
  .put('/listing/:list_id', authorize(Role.Admin), Admin.updateOneListing)
  .delete('/listing/:list_id', authorize(Role.Admin), Admin.deleteOneListing);

export default router;
