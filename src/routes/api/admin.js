import { router } from '../../utils';
import { addCourseController } from '../../controllers';
import { validate } from '../../middleware';
import { schema } from '../../models';

router.post('/course', validate(schema.addCourse), addCourseController);

export default router;
