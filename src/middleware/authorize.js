import { token } from '../utils';

export const authorize = (roles = []) => {
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return (req, res, next) => {
    const tokenHeader = req.header('x-auth-token');
    if (!tokenHeader) {
      return res.status(401).json({ msg: 'No Token, Authorization Denied' });
    }

    try {
      const decoded = token.verify(tokenHeader);
      req.user = decoded;

      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      next();
    } catch (err) {
      console.error(err.message);
      res.status(401).json({ msg: 'Token is Invalid' });
    }
  };
};
