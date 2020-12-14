import jwt from 'jsonwebtoken';

import { jwt_secret } from '../config';

export const token = {
  sign: (payload, expiresIn = '1h') => {
    return jwt.sign(payload, jwt_secret, { expiresIn });
  },
  verify: (token) => {
    return jwt.verify(token, jwt_secret);
  },
};
