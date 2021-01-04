import { DB } from '../config';

class Education {
  tableName = 'education';

  add = async ({
    register_no,
    tenth_board,
    tenth_percentage,
    twelfth_board,
    twelfth_percentage,
    grad_course,
    grad_percentage,
    updated_on,
  }) => {
    await DB.insert({
      register_no,
      tenth_board,
      tenth_percentage,
      twelfth_board,
      twelfth_percentage,
      grad_course,
      grad_percentage,
      updated_on,
    }).into(this.tableName);

    return { register_no, msg: 'Added' };
  };

  update = async ({
    register_no,
    tenth_board,
    tenth_percentage,
    twelfth_board,
    twelfth_percentage,
    grad_course,
    grad_percentage,
    updated_on,
  }) => {
    await DB(this.tableName).where({ register_no }).update({
      tenth_board,
      tenth_percentage,
      twelfth_board,
      twelfth_percentage,
      grad_course,
      grad_percentage,
      updated_on,
    });

    return { register_no, msg: 'Updated' };
  };

  findById = async (register_no) => {
    const result = await DB.select(
      'tenth_board',
      'tenth_percentage',
      'twelfth_board',
      'twelfth_percentage',
      'grad_course',
      'grad_percentage',
      'updated_on'
    )
      .where({ register_no })
      .from(this.tableName);

    return result[0];
  };
}

export default new Education();
