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

      return { register_no, msg: 'Added' };
    } catch (err) {
      console.log(err);
      return { err_msg: 'error occured' };
    }
  };

  update = async ({
    register_no,
    cgpa,
    active_backlog,
    backlog_history,
    updated_on,
  }) => {
    await DB(this.tableName)
      .where({ register_no })
      .update({ cgpa, active_backlog, backlog_history, updated_on });

    return { register_no, msg: 'Updated' };
  };

  findById = async (register_no) => {
    // const result = await DB(this.tableName).where({ register_no });
    // returns without register_no
    const result = await DB.select(
      'cgpa',
      'active_backlog',
      'backlog_history',
      'updated_on'
    )
      .where({ register_no })
      .from(this.tableName);

    return result[0];
  };
}

export default new Mark();
