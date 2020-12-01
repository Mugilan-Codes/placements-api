export const registerController = async (req, res, next) => {
  const { register_no, stud_email, password } = req.body;
  res.json({ register_no, stud_email, password });
};
