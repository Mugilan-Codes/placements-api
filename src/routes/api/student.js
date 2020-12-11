import { router } from '../../utils';
import { validate } from '../../middleware';
import { schema } from '../../models';
import { Student } from '../../controllers';

router
  .get('/', Student.getAll)
  .get('/:register_no', Student.getOne)
  .post('/register', validate(schema.registerStudent), Student.register);

export default router;
