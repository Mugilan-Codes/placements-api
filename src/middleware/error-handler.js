import { ApiError } from '../utils';

export default (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.status).send({
      error: {
        status: err.status,
        message: err.message,
      },
    });
  }

  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      error: {
        status: 401,
        message: 'Invalid Token',
      },
    });
  }

  return res.status(500).send({
    error: {
      status: 500,
      message: err.message || 'Internal Server Error',
    },
  });
};
