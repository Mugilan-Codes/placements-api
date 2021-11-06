# Placements API

## Anna University CUIC app for Placements

### TODO

- check migrations file to replace raw implementation
- Caching using Redis.
- use express-rate-limit & express-slow-down
- Listing `start_date` format should be `yyyy-mm-dd`. ([@hapi/joi-date](https://www.npmjs.com/package/@hapi/joi-date))
- Create website for admin (use CMS or react.js or next.js)
- Deploy using AWS EC2 container and use Amazon SES with it
- Handle Errors efficiently. Use loggers like `winston`
- verify Email and reset password.
- Check for Valid date before adding listing.
- Send proper errors to frontend. Including Joi Validation and Database errors.
- [Node.js + MySQL - Boilerplate API with Email Sign Up, Verification, Authentication & Forgot Password](https://jasonwatmore.com/post/2020/09/08/nodejs-mysql-boilerplate-api-with-email-sign-up-verification-authentication-forgot-password)
- Add RefreshToken for Student. Do Admin Later
- Migration TODO's
  - Change id of each table to UUID like values
  - Set Triggers to enforce uniqueness across tables
  - Add created_by & updated_by admin details for each course
  - Add Course degree, type, & name as a criteria to listings
  - start_time & end_date to listings
  - created_by & updated_by admins to listings
  - Separate table to hold active refresh tokens
- [How to get the full URL in Express?](https://stackoverflow.com/a/10185427/12381908)
- Create Token Table to store the tokens for verification and reference the student id.

### Sources

- [How to Use Nodemailer to Send Emails from Your Node.js Server](https://www.freecodecamp.org/news/use-nodemailer-to-send-emails-from-your-node-js-server/)
- [How to send email with Node.js?](https://netcorecloud.com/tutorials/how-to-send-email-with-node-js/)

### Create Tables

- Create MySQL user and move into it.
- source the init.sql file by using `source init.sql`.
- Knex Config

  - Init

    ```sh
    knex init --cwd ./src
    ```

  - Create
  
    ```sh
     knex migrate:make --cwd ./src create_admin_table
     knex migrate:make --cwd ./src create_course_table
     knex migrate:make --cwd ./src create_student_table
     knex migrate:make --cwd ./src create_marks_table
     knex migrate:make --cwd ./src add_check_to_marks_table
     knex migrate:make --cwd ./src create_education_table
     knex migrate:make --cwd ./src add_check_to_education_table
     knex migrate:make --cwd ./src create_listings_table
     knex migrate:make --cwd ./src add_check_to_listings_table
    ```

  - Seed

    ```sh
    knex seed:make --cwd ./src 01_courses
    ```

  - Make the Migrations and Seed the database

    ```sh
    knex migrate:latest --knexfile ./src/knexfile.js
    knex seed:run --knexfile ./src/knexfile.js
    ```

### How to Deploy

1. Move to production branch if it exists
2. commit changes and push it to heroku
3. add config vars and add db as add on

### Routes TODO

`Admin`

- [X] Register
- [X] Login
- [ ] Logout
- [X] Get One Student
- [X] Get All Students
- [X] Get All Students (separated by emailUnverifed and adminVerified & adminUnVerified)
- [ ] Verify Students
- [ ] Delete Student
- [X] Add Course
- [X] Update Course
- [X] Delete Course
- [X] Get One Course
- [X] Add Listing
- [X] Update Listing
- [X] Get All Listings
- [ ] Delete All Listings
- [X] Get One Listing
- [X] Delete One Listing
- [ ] Delete Multiple Listings

`Student`

- [X] Register
- [X] Verify Email
- [X] Login
- [ ] Logout
- [X] Get Student Detail
- [X] Update Student
- [X] Add Marks
- [X] Update Marks
- [X] Add Education
- [X] Update Education
- [ ] Forgot/Reset Password
- [X] Get All Listings with Eligibilty
- [X] Get One Listing with Eligibilty

`Common`

- [X] Get All Courses
