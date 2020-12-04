import { ApiError, router } from '../../utils';
import { registerController } from '../../controllers';
import { validate } from '../../middleware';
import schema from '../../models/schema';

router
  .get('/', (req, res, next) => {
    res.send('Working!');
  })
  .get('/test', (req, res, next) => {
    next(ApiError.badRequest('This is a bad request'));
  })
  .post('/register', validate(schema.registerStudent), registerController);

export default router;
