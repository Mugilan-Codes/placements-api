import { Role, router } from '../../utils';
import { authorize, validate } from '../../middleware';
import { schemaStudent } from '../../models';
import { Student } from '../../controllers';

router
  .get('/', authorize(Role.Student), Student.getAll)
  .get('/:register_no', Student.getOne)
  .post('/register', validate(schemaStudent.register), Student.register)
  .post('/login', validate(schemaStudent.login), Student.login);

export default router;
