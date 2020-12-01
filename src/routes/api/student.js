import { ApiError, router } from '../../utils';
import { DB } from '../../config';

router
  .get('/', (req, res, next) => {
    res.send('Working!');
  })
  .get('/test', (req, res, next) => {
    next(ApiError.badRequest('This is a bad request'));
  });

export default router;
