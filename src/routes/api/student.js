import { ApiError, router } from '../../utils';
import { DB } from '../../config';
import { registerController } from '../../controllers';

router
  .get('/', (req, res, next) => {
    res.send('Working!');
  })
  .get('/test', (req, res, next) => {
    next(ApiError.badRequest('This is a bad request'));
  })
  .post('/register', registerController);

export default router;
