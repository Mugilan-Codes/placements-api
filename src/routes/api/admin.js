import { Role, router } from '../../utils';
import { addCourseController } from '../../controllers';
import { authorize, validate } from '../../middleware';
import { schema } from '../../models';

router.post(
  '/course',
  authorize(Role.Admin),
  validate(schema.course.add),
  addCourseController
);

export default router;
