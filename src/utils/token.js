import jwt from 'jsonwebtoken';

import { jwt_secret } from '../config';

const ACCESS_TOKEN_EXPIRY = '1d'; //! change back to '1h'
const REFRESH_TOKEN_EXPIRY = '7d';

export const token = {
  sign: (payload, expiresIn = ACCESS_TOKEN_EXPIRY) => {
    return jwt.sign(payload, jwt_secret.access, { expiresIn });
  },
  verify: (token) => {
    return jwt.verify(token, jwt_secret.access);
  },
  refresh: {
    sign: (payload, expiresIn = REFRESH_TOKEN_EXPIRY) => {
      return jwt.sign(payload, jwt_secret.refresh, { expiresIn });
    },
    verify: (token) => {
      return jwt.sign(token, jwt_secret.refresh);
    },
  },
};
