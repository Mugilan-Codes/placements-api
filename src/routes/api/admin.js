import { router } from '../../utils';
import { addCourseController } from '../../controllers';
import { validate } from '../../middleware';
import { schema } from '../../models';

router.post('/course', validate(schema.course.add), addCourseController);

export default router;
