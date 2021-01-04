import { DB } from '../config';

class Education {
  tableName = 'education';

  addEducation = async ({
    register_no,
    tenth_board,
    tenth_percentage,
    twelfth_board,
    twelfth_percentage,
    grad_course,
    grad_percentage,
    updated_on,
  }) => {};

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
