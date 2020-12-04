import { router } from '../../utils';
import { addCourseController } from '../../controllers/admin';

router.post('/course', addCourseController);

export default router;
