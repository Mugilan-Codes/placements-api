import { DB } from '../config';

class Mark {
  tableName = 'marks';

  addMarks = async ({
    register_no,
    cgpa,
    active_backlog,
    backlog_history,
    updated_on,
  }) => {
    try {
      await DB.insert({
        register_no,
        cgpa,
        active_backlog,
        backlog_history,
        updated_on,
      }).into(this.tableName);

      return { register_no };
    } catch (err) {
      console.log(err);
      return { err_msg: 'error occured' };
    }
  };
}

export default new Mark();
