import student from './api/student';
import admin from './api/admin';

export default (app) => {
  app.use('/api/student', student);
  app.use('/api/admin', admin);
};
