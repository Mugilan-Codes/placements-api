# Placements API

## Anna University CUIC app for Placements

### TODO

- Remove `console.log` in production because it is not async. Use loggers like `winston`
- Docker Environments for testing and deploypment
- Handle Errors efficiently
- [Routes TODO](#routes-todo)
- Use [nodemailer](https://nodemailer.com/about/) to send emails for verification to user
  - [How to send email with Node.js?](https://netcorecloud.com/tutorials/how-to-send-email-with-node-js/)
  - [Node.js - Send Emails via SMTP with Nodemailer](https://jasonwatmore.com/post/2020/07/20/nodejs-send-emails-via-smtp-with-nodemailer)
  - [Sending emails in NodeJs with Nodemailer](https://dev.to/alakazam03/sending-emails-in-nodejs-with-nodemailer-1jn1)
  - use mailgun
- verify Email and reset password.
- Check for Valid date before adding listing.
- Send proper errors to frontend. Including Joi Validation and Database errors.
- [Node.js + MySQL - Boilerplate API with Email Sign Up, Verification, Authentication & Forgot Password](https://jasonwatmore.com/post/2020/09/08/nodejs-mysql-boilerplate-api-with-email-sign-up-verification-authentication-forgot-password)
- use date-fns package
- Use [Objection.js](https://vincit.github.io/objection.js/) as ORM
- Add RefreshToken for Student. Do Admin Later
- Rename knex folder to db and export db instance from there instead of config
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

### Routes ( /api )

- **_POST_ /admin/course** - Creates Course (Admin Only)
  
  ```js
  {
    degree: "<UG/PG>", // (optional = UG) 
    type: "<R/SS>", // (optional = R) 
    short_name: "",
    course_name: "",
    department: "",
  }
  ```

- **_GET_ /student** - returns all registered students
- **_GET_ /student/courses** - returns all courses

### Routes TODO

`Admin`

- [X] Register
- [X] Login
- [ ] Logout
- [X] Get One Student
- [X] Get All Students
- [ ] Get All Students (separated by emailUnverifed and adminVerified & adminUnVerified)
- [ ] Verify Students
- [ ] Delete Student
- [X] Add Course
- [ ] Update Course
- [ ] Delete Course
- [X] Get One Course
- [X] Add Listing
- [ ] Update Listing
- [X] Get All Listings
- [X] Get One Listing
- [ ] Delete One Listing

`Student`

- [X] Register
- [ ] Verify Email
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

### DOCS

- [Joi](https://joi.dev/api/?v=17.3.0)
- [Knex](http://knexjs.org/)
- [Nodemailer](https://nodemailer.com/about/)
