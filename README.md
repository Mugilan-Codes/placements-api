# Placements API

## Anna University CUIC app for Placements

### TODO

- Remove `console.log` in production because it is not async. Use loggers like `winston`
- Docker Environment for Development and Testing
- Handle Errors efficiently
- Forgot/Reset Password, Verify Email, Resend Verification
- Students initially be unverified and will be verified by the admin.
- Refactoring
- Admin
  [X] Register
  [X] Login
  [X] Get One Student
  [X] Get All Students
  [X] Add Course
  [ ] Update Course
  [ ] Delete Course
  [X] Get One Course
  [ ] Add Listing
  [ ] Update Listing
  [ ] Get All Listings
  [ ] Delete Listings
- Student
  [X] Register
  [X] Login
  [X] Get Student Detail
  [X] Update Student
  [X] Add Marks
  [X] Update Marks
  [X] Add Education
  [X] Update Education
  [ ] Get All Listings with Eligibilty
- Common
  [X] Get All Courses

### Create Tables

- Create MySQL user and move into it.
- source the init.sql file by using `source init.sql`.

#### Routes ( /api )

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

#### DOCS

- [Joi](https://joi.dev/api/?v=17.3.0)
- [Knex](http://knexjs.org/)
