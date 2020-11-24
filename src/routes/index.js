import student from './api/student';

export default (app) => {
  app.use('/api/student', student);
};
