import { ApiError } from '../utils';

export default (err, req, res, next) => {
  if (err instanceof ApiError) {
    res.status(err.status).send({
      error: {
        status: err.status,
        message: err.message,
      },
    });
    return;
  }

  console.log(err.message);

  return res.status(500).send({
    error: {
      status: 500,
      message: err.message || 'Internal Server Error',
    },
  });
};
