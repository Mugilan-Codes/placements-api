DROP DATABASE IF EXISTS `placement_db`;

CREATE DATABASE IF NOT EXISTS `placement_db`;

USE `placement_db`;

CREATE TABLE IF NOT EXISTS course (
  id VARCHAR(15) PRIMARY KEY,
  degree ENUM('UG', 'PG') NOT NULL,
  type ENUM('R', 'SS') DEFAULT 'R',
  short_name VARCHAR(25) NOT NULL,
  course_name VARCHAR(75) NOT NULL UNIQUE,
  department VARCHAR(75) NOT NULL,
  UNIQUE(short_name, type)
) ENGINE=INNODB;

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

INSERT INTO course 
  (id, degree, type, short_name, course_name, department) 
VALUES 
  ('pg-mca-r', 'PG', 'R', 'MCA', 'Master of Computer Applications - Regular', 'Information Science & Technology'),
  ('pg-mca-ss', 'PG', 'SS', 'MCA', 'Master of Computer Applications - Self Supporting', 'Information Science & Technology'),
  ('pg-mba-r', 'PG', 'R', 'MBA', 'Master of Buisness Administrations - Regular', 'Management Studies'),
  ('ug-cse', 'UG', 'R', 'CSE', 'B.E. Computer Science and Engineering', 'Computer Science & Engineering');