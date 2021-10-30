import { Listing } from '../models';

export const add = async ({
  title,
  description,
  company_name,
  start_date,
  tenth_percentage,
  twelfth_percentage,
  grad_percentage,
  cgpa,
  active_backlog,
  backlog_history,
}) => {
  const newListingResult = await Listing.query().insert({
    title,
    description,
    company_name,
    start_date,
    tenth_percentage,
    twelfth_percentage,
    grad_percentage,
    cgpa,
    active_backlog,
    backlog_history,
  });
  console.log({ newListingResult });

  return { title: newListingResult.title, msg: 'Listing Added' };
};

export const findIdByTitle = async (title) => {
  const findIdByTitleResult = await Listing.query()
    .select('id')
    .where({ title })
    .first();
  console.log({ findIdByTitleResult });

  return findIdByTitleResult;
};

export const findAll = async () => {
  const findAllResult = await Listing.query();
  console.log({ findAllResult });

  return findAllResult;
};

export const findById = async (id) => {
  const findByIdResult = await Listing.query().findById(id);
  console.log({ findByIdResult });

  return findByIdResult;
};

export const deleteById = async (id) => {
  const deleteByIdResult = await Listing.query().deleteById(id);
  console.log({ deleteByIdResult });

  return { noOfRowsDeleted: deleteByIdResult, msg: 'Listing Deleted' };
};
