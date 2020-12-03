CREATE DATABASE IF NOT EXISTS `placement_db`;

USE `placement_db`;

CREATE TABLE IF NOT EXISTS course (
  course_id VARCHAR(10) PRIMARY KEY,
  degree ENUM('UG', 'PG') NOT NULL,
  short_name VARCHAR(5) NOT NULL UNIQUE,
  course_name VARCHAR(50) NOT NULL UNIQUE,
  department VARCHAR(50) NOT NULL
) ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS student (
  register_no VARCHAR(15) PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL UNIQUE,
  stud_email VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(50) NOT NULL,
  course_id VARCHAR(10),
  created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`course_id`) 
    REFERENCES `course`(`course_id`)
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
  10th_board VARCHAR(30) NOT NULL,
  10th_percentage NUMERIC(4, 2) NOT NULL 
    CHECK(`10th_percentage` >= 0 
      AND `10th_percentage` <= 100),
  12th_board VARCHAR(30) NOT NULL,
  12th_percentage NUMERIC(4, 2) NOT NULL 
    CHECK(`12th_percentage` >= 0 
      AND `12th_percentage` <= 100),
  grad_course VARCHAR(30),
  grad_percentage NUMERIC(4, 2) 
    CHECK(`grad_percentage` >= 0 
      AND `grad_percentage` <= 100),
  updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`register_no`)
    REFERENCES `student`(`register_no`)
    ON DELETE CASCADE
) ENGINE=INNODB;