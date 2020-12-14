import { router } from '../../utils';
import { addCourseController } from '../../controllers';
import { validate } from '../../middleware';
import { schemaCourse } from '../../models';

router.post('/course', validate(schemaCourse.add), addCourseController);

export default router;
