/**
 * @param {import('knex')} knex
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('course').del();
  // Insert seed entries
  await knex('course').insert([
    {
      id: 'pg-mca-r',
      degree: 'PG',
      type: 'R',
      short_name: 'MCA',
      course_name: 'Master of Computer Applications - Regular',
      department: 'Information Science & Technology',
    },
    {
      id: 'pg-mca-ss',
      degree: 'PG',
      type: 'SS',
      short_name: 'MCA',
      course_name: 'Master of Computer Applications - Self Supporting',
      department: 'Information Science & Technology',
    },
    {
      id: 'pg-mba-r',
      degree: 'PG',
      type: 'R',
      short_name: 'MBA',
      course_name: 'Master of Buisness Administrations - Regular',
      department: 'Management Studies',
    },
    {
      id: 'ug-cse',
      degree: 'UG',
      type: 'R',
      short_name: 'CSE',
      course_name: 'B.E. Computer Science and Engineering',
      department: 'Computer Science & Engineering',
    },
  ]);
}
