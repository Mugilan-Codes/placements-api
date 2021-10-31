import { Student } from '../models';

export const add = async ({
  register_no,
  name,
  email,
  password,
  course_id,
  verification_token,
}) => {
  const newStudentResult = await Student.query().insert({
    register_no,
    name,
    email,
    password,
    course_id,
    verification_token,
  });

  return newStudentResult;
};

export const findById = async (register_no) => {
  const findByIdResult = await Student.query().findById(register_no);

  return findByIdResult;
};

export const findOne = async ({ register_no, email, token } = {}) => {
  let findOneResult;

  if (register_no) {
    findOneResult = await Student.query().findById(register_no);
  } else if (email) {
    findOneResult = await Student.query().findOne({ email });
  } else if (token) {
    findOneResult = await Student.query().findOne({
      verification_token: token,
    });
  }

  return findOneResult;
};

export const update = async (register_no, userFields) => {
  const updateResult = await Student.query().patchAndFetchById(
    register_no,
    userFields
  );

  return updateResult;
};

export const findAll = async () => {
  const findAllResult = await Student.query().select('register_no');

  return findAllResult;
};
