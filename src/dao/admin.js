import { Admin } from '../models';

// adds admin and returns id
export const add = async ({ name, email, password }) => {
  const createAdminResult = await Admin.query().insert({
    name,
    email,
    password,
  });

  const newAdminId = createAdminResult.id;

  return newAdminId;
};

// finds admin with given email
export const findOne = async (email) => {
  const findOneResult = await Admin.query().findOne({ email });

  return findOneResult;
};

// finds admin with given id
export const findById = async (id) => {
  const findByIdResult = await Admin.query().findById(id);

  return findByIdResult;
};
