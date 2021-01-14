import { DB } from '../config';

class Listing {
  tableName = 'listings';

  add = async ({
    title,
    description,
    name,
    start_date,
    tenth_percentage,
    twelfth_percentage,
    grad_percentage,
    cgpa,
    active_backlog,
    backlog_history,
  }) => {
    await DB.insert({
      title,
      description,
      name,
      start_date,
      tenth_percentage,
      twelfth_percentage,
      grad_percentage,
      cgpa,
      active_backlog,
      backlog_history,
    }).into(this.tableName);
  };
}

export default new Listing();
