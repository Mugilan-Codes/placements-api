import { Education } from '../models';

export const add = async ({
  register_no,
  tenth_board,
  tenth_percentage,
  twelfth_board,
  twelfth_percentage,
  grad_course,
  grad_percentage,
}) => {
  const addEducationResult = await Education.query().insert({
    register_no,
    tenth_board,
    tenth_percentage,
    twelfth_board,
    twelfth_percentage,
    grad_course,
    grad_percentage,
  });

  return addEducationResult;
};

export const findById = async (register_no) => {
  const findByIdResult = await Education.query().findById(register_no);

  return findByIdResult;
};

export const update = async ({
  register_no,
  tenth_board,
  tenth_percentage,
  twelfth_board,
  twelfth_percentage,
  grad_course,
  grad_percentage,
}) => {
  const updateResult = await Education.query().patchAndFetchById(register_no, {
    tenth_board,
    tenth_percentage,
    twelfth_board,
    twelfth_percentage,
    grad_course,
    grad_percentage,
  });

  return updateResult;
};
