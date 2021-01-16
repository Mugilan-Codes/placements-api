import { DB } from '../config';

class Listing {
  tableName = 'listings';

  add = async ({
    title,
    description,
    company_name,
    start_date,
    tenth_percentage,
    twelfth_percentage,
    grad_percentage,
    current_cgpa,
    active_backlog,
    backlog_history,
  }) => {
    await DB.insert({
      title,
      description,
      company_name,
      start_date,
      tenth_percentage,
      twelfth_percentage,
      grad_percentage,
      current_cgpa,
      active_backlog,
      backlog_history,
    }).into(this.tableName);

    return { title, msg: 'Listing Added' };
  };

  findIdByTitle = async (title) => {
    const list_id = (
      await DB.select('id').where({ title }).from(this.tableName)
    )[0];

    return list_id;
  };

  findById = async (id) => {
    const listing = (await DB.select().where({ id }).from(this.tableName))[0];

    return listing;
  };

  //! Without eligibility and created_on attributes
  findAll = async () => {
    const listings = await DB.select(
      'id',
      'title',
      'description',
      'company_name',
      'start_date',
      'updated_on'
    ).from(this.tableName);

    return listings;
  };
}

export default new Listing();
