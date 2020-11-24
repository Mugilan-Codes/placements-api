import bcrypt from 'bcrypt';

export default {
  hash: (password, saltRounds = 10) => {
    return bcrypt.hash(password, saltRounds);
  },
  compare: (password, passwordHash) => {
    return bcrypt.compare(password, passwordHash);
  },
};
