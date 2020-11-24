import bcrypt from 'bcrypt';

export default password = {
  hash: (password, saltRounds = 10) => {
    return bcrypt.hash(password, saltRounds);
  },
  compare: (password, passwordHash) => {
    return bcrypt.compare(password, passwordHash);
  },
};
