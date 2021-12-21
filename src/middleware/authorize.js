import { logger, token } from '../utils';

const AUTH_HEADER = 'x-auth-token';

export const authorize = (roles = []) => {
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return (req, res, next) => {
    const tokenHeader = req.header(AUTH_HEADER);
    if (!tokenHeader) {
      return res.status(401).json({ msg: 'No Token, Authorization Denied' });
    }

    try {
      const decoded = token.verify(tokenHeader);
      req.user = decoded;

      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(401).json({ msg: 'Unauthorized' });
      }

      next();
    } catch (err) {
      logger.error(`authorize --> ${err.message}`);
      res.status(401).json({ msg: 'Token is Invalid', err_msg: err.message });
    }
  };
};
