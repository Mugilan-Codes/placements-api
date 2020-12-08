# Placements API

## Anna University CUIC app for Placements

### TODO

- use [KNEX.JS](http://knexjs.org/) as a SQL Query Builder
- Remove `console.log` in production because it is not async. Use loggers like `winston`
- Docker Environment for Development and Testing
- Handle Errors efficiently

### Create Tables

- Create MySQL user and move into it.
- source the init.sql file by using `source init.sql`.

#### ROUTES

- Update or Delete a course (course_id): Access only by Admin
- Register Student - register number, name, email, student email, dob, password, course_id - Confirmation email to student email and email for both verification. needs only one.
- Login Student - using register number/student email with password
- student mark and education - register number, cgpa(avg till now), active backlog, backlog history, 10th & 12th Board and percentage, Grad course and percentage for PG students.
- Students initially be unverified and will be verified by the admin.
- Authorization for Admin and Student.
