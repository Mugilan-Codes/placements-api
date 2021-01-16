DROP DATABASE IF EXISTS `placement_db`;

CREATE DATABASE IF NOT EXISTS `placement_db`;

USE `placement_db`;

-- todo: Change id of each table to UUID like values 

-- todo: Set Triggers to enforce uniqueness across tables
CREATE TABLE IF NOT EXISTS admin (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
  email VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(100) NOT NULL,
  created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=INNODB;

-- todo: Add created_by & updated_by admin details for each course
CREATE TABLE IF NOT EXISTS course (
  id VARCHAR(15) PRIMARY KEY,
  degree ENUM('UG', 'PG') NOT NULL,
  type ENUM('R', 'SS') DEFAULT 'R',
  short_name VARCHAR(25) NOT NULL,
  course_name VARCHAR(75) NOT NULL UNIQUE,
  department VARCHAR(75) NOT NULL,
  UNIQUE(short_name, type)
) ENGINE=INNODB;

-- todo: email_verified by student and admin_verified values to be added
CREATE TABLE IF NOT EXISTS student (
  register_no VARCHAR(15) PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(100) NOT NULL,
  course_id VARCHAR(15),
  created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`course_id`) 
    REFERENCES `course`(`id`)
) ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS marks (
  register_no VARCHAR(15) PRIMARY KEY,
  cgpa NUMERIC(4,2) NOT NULL 
    CHECK(`cgpa` >= 0 
      AND `cgpa` <= 10),
  active_backlog INT DEFAULT 0,
  backlog_history INT DEFAULT 0,
  updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`register_no`) 
    REFERENCES `student`(`register_no`) 
    ON DELETE CASCADE
) ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS education (
  register_no VARCHAR(15) PRIMARY KEY,
  tenth_board VARCHAR(30) NOT NULL,
  tenth_percentage NUMERIC(5, 2) NOT NULL 
    CHECK(`tenth_percentage` >= 0 
      AND `tenth_percentage` <= 100),
  twelfth_board VARCHAR(30) NOT NULL,
  twelfth_percentage NUMERIC(5, 2) NOT NULL 
    CHECK(`twelfth_percentage` >= 0 
      AND `twelfth_percentage` <= 100),
  grad_course VARCHAR(30),
  grad_percentage NUMERIC(5, 2) 
    CHECK(`grad_percentage` >= 0 
      AND `grad_percentage` <= 100),
  updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`register_no`)
    REFERENCES `student`(`register_no`)
    ON DELETE CASCADE
) ENGINE=INNODB;

-- todo: Add Course degree, type, & name as a criteria
-- todo: start_time & end_date
-- todo: created_by & updated_by admins
--? SELECT DATE_FORMAT(CURDATE(), '%D %b, %Y (%W)') today; // Date Format
CREATE TABLE IF NOT EXISTS listings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(50) UNIQUE NOT NULL,
  description VARCHAR(255) NOT NULL,
  company_name VARCHAR(50) NOT NULL,
  start_date DATE NOT NULL,
  tenth_percentage NUMERIC(5, 2)
    CHECK(`tenth_percentage` >= 0 
      AND `tenth_percentage` <= 100),
  twelfth_percentage NUMERIC(5, 2)
    CHECK(`twelfth_percentage` >= 0 
      AND `twelfth_percentage` <= 100),
  grad_percentage NUMERIC(5, 2) 
    CHECK(`grad_percentage` >= 0 
      AND `grad_percentage` <= 100),
  current_cgpa NUMERIC(4,2) 
    CHECK(`current_cgpa` >= 0 
      AND `current_cgpa` <= 10),
  active_backlog INT,
  backlog_history INT,
  created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=INNODB;

-- todo: Separate table to hold active refresh tokens

INSERT INTO course 
  (id, degree, type, short_name, course_name, department) 
VALUES 
  ('pg-mca-r', 'PG', 'R', 'MCA', 'Master of Computer Applications - Regular', 'Information Science & Technology'),
  ('pg-mca-ss', 'PG', 'SS', 'MCA', 'Master of Computer Applications - Self Supporting', 'Information Science & Technology'),
  ('pg-mba-r', 'PG', 'R', 'MBA', 'Master of Buisness Administrations - Regular', 'Management Studies'),
  ('ug-cse', 'UG', 'R', 'CSE', 'B.E. Computer Science and Engineering', 'Computer Science & Engineering');