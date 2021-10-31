import { Mark } from '../models';

export const add = async ({
  register_no,
  cgpa,
  active_backlog,
  backlog_history,
}) => {
  const addMarkResult = await Mark.query().insert({
    register_no,
    cgpa,
    active_backlog,
    backlog_history,
  });

  return addMarkResult;
};

export const findById = async (register_no) => {
  const findByIdResult = await Mark.query().findById(register_no);

  return findByIdResult;
};

export const update = async ({
  register_no,
  cgpa,
  active_backlog,
  backlog_history,
}) => {
  const updateResult = await Mark.query().patchAndFetchById(register_no, {
    cgpa,
    active_backlog,
    backlog_history,
  });

  return updateResult;
};
