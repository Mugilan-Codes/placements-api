export default (req, res, next) => {
  console.log(`Logged ${req.method} --> ${req.url} --> ${new Date()}`);
  next();
};
