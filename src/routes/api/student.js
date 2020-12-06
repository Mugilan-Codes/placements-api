import { router } from '../../utils';
import { validate } from '../../middleware';
import { schema } from '../../models';
import { Student } from '../../controllers';

router.post('/register', validate(schema.registerStudent), Student.register);

export default router;
