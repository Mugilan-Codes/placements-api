export const addCourseController = async (req, res, next) => {
  console.log(req.body);
  res.json(req.body);
};
