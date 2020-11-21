import { ApiError } from '../../utils';

export default (err, req, res, next) => {
  // res.status(err.status || 500).send({
  // error: {
  //   status: err.status || 500,
  //   message: err.message || 'Internal Server Error',
  // },
  // });

  console.error(err);

  if (err instanceof ApiError) {
    res.status(err.status).send({
      error: {
        status: err.status,
        message: err.message || 'Internal Server Error',
      },
    });
    return;
  }

  next(ApiError.internal());
  res.status(500).send('Something went wrong!');
};
