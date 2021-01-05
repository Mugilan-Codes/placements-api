# Placements API

## Anna University CUIC app for Placements

### TODO

- Remove `console.log` in production because it is not async. Use loggers like `winston`
- Docker Environment for Development and Testing
- Handle Errors efficiently
- Forgot Password, Verify Email, Resend Verification, Password reset.
- Update or Delete a course (course_id): Access only by Admin
- Students initially be unverified and will be verified by the admin.
- Authorization for Admin.
- Company Postings
- Eligibilty criteria
- Refactor
- Decide whether to use PUT or PATCH for updating.

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
