import jwt from 'jsonwebtoken';

import { jwt_secret } from '../config';

export const token = {
  sign: (payload, expiresIn = '1h') => {
    return jwt.sign(payload, jwt_secret.access, { expiresIn });
  },
  verify: (token) => {
    return jwt.verify(token, jwt_secret.access);
  },
  refresh: {
    sign: (payload, expiresIn = '1d') => {
      return jwt.sign(payload, jwt_secret.refresh, { expiresIn });
    },
    verify: (token) => {
      return jwt.sign(token, jwt_secret.refresh);
    },
  },
};
