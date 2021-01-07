// todo: Change to Winston Logging
export default (req, res, next) => {
  console.log(`Logged ${req.method} --> ${req.url} --> ${new Date()}`);
  next();
};
