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
  };
}

export default new Listing();
