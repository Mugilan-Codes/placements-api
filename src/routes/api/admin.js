import { Role, router } from '../../utils';
import { Admin } from '../../controllers';
import { authorize, validate } from '../../middleware';
import { schema } from '../../models';

router
  .post('/register')
  .post(
    '/course',
    [authorize(Role.Admin), validate(schema.course.add)],
    Admin.addCourse
  );

export default router;
