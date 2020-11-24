import { ApiError, router } from '../../utils';

router
  .get('/', (req, res, next) => {
    res.send('Hi');
  })
  .get('/test', (req, res, next) => {
    next(ApiError.badRequest('This is a bad request'));
  });

export default router;
