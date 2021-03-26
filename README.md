# Placements API

## Anna University CUIC app for Placements

### TODO

- Remove `console.log` in production because it is not async. Use loggers like `winston`
- Docker Environment for Development and Testing
- Handle Errors efficiently
- Students initially be unverified and will be verified by the admin.
- [Routes TODO](#routes-todo)
- Use [nodemailer](https://nodemailer.com/about/) to send emails for verification to user
  - [How to send email with Node.js?](https://netcorecloud.com/tutorials/how-to-send-email-with-node-js/)
  - [Node.js - Send Emails via SMTP with Nodemailer](https://jasonwatmore.com/post/2020/07/20/nodejs-send-emails-via-smtp-with-nodemailer)
  - [Sending emails in NodeJs with Nodemailer](https://dev.to/alakazam03/sending-emails-in-nodejs-with-nodemailer-1jn1)
- Modify the database to have emailVerified and adminVerified to the students.
- verify Email and reset password.
- Check for Valid date before adding listing.
- Send proper errors to frontend. Including Joi Validation and Database errors.

### Create Tables

- Create MySQL user and move into it.
- source the init.sql file by using `source init.sql`.

### Routes ( /api )

- **_POST_ /admin/course** - Creates Course (Admin Only)
  
  ```js
  {
    degree: "<UG/PG>",
    type: "<R/SS>", // (optional)
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
- [X] Get One Student
- [X] Get All Students
- [ ] Verify Students
- [ ] Delete Student
- [X] Add Course
- [ ] Update Course
- [ ] Delete Course
- [X] Get One Course
- [x] Add Listing
- [ ] Update Listing
- [X] Get All Listings
- [X] Get One Listing
- [ ] Delete One Listing

`Student`

- [X] Register
- [ ] Verify Email
- [X] Login
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
