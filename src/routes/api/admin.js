import { Role, router } from '../../utils';
import { Admin } from '../../controllers';
import { authorize, validate } from '../../middleware';
import { schema } from '../../models';

router
  .post('/register', validate(schema.admin.register), Admin.register)
  .post('/login', validate(schema.admin.login), Admin.login)
  .get('/', authorize(Role.Admin), Admin.getDetail)
  .post(
    '/course',
    [authorize(Role.Admin), validate(schema.course.add)],
    Admin.addCourse
  );

export default router;
