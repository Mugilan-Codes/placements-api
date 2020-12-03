export const registerController = async (req, res, next) => {
  console.log(req.body);
  res.json(req.body);
};
