import { Role, router } from '../../utils';
import { authorize, validate } from '../../middleware';
import { schema } from '../../models';
import { Student } from '../../controllers';

router
  .get('/', authorize(Role.Student), Student.getAll)
  .get('/:register_no', Student.getOne)
  .post('/register', validate(schema.registerStudent), Student.register);

export default router;
