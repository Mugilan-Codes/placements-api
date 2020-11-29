CREATE DATABASE IF NOT EXISTS `placement_db`;

USE `placement_db`;

CREATE TABLE IF NOT EXISTS `courses` (
  `course_id` VARCHAR(5) PRIMARY KEY,
  `degree` ENUM('UG', 'PG') NOT NULL,
  `short_name` VARCHAR(5) UNIQUE,
  `course_name` VARCHAR(50) NOT NULL UNIQUE,
  `department` VARCHAR(50) NOT NULL
) ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS `student` (
  `register_no` VARCHAR(15) PRIMARY KEY,
  `name` VARCHAR(50) NOT NULL,
  `email` VARCHAR(50),
  `stud_email` VARCHAR(50),
  `course_id` VARCHAR(5),
  FOREIGN KEY (`course_id`) 
    REFERENCES `courses`(`course_id`) 
      ON UPDATE CASCADE
) ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS `marks` (
  `register_no` VARCHAR(15) PRIMARY KEY,
  `cgpa` NUMERIC(4,2) NOT NULL 
    CHECK(`cgpa` >= 0 
      AND `cgpa` <= 10),
  `active_backlog` INT DEFAULT 0,
  `backlog_history` INT DEFAULT 0,
  FOREIGN KEY (`register_no`) 
    REFERENCES `student`(`register_no`) 
      ON DELETE CASCADE
) ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS `education` (
  `register_no` VARCHAR(15) PRIMARY KEY,
  `10th_board` VARCHAR(30) NOT NULL,
  `10th_percentage` NUMERIC(4, 2) NOT NULL 
    CHECK(`10th_percentage` >= 0 
      AND `10th_percentage` <= 100),
  `12th_board` VARCHAR(30) NOT NULL,
  `12th_percentage` NUMERIC(4, 2) NOT NULL 
    CHECK(`12th_percentage` >= 0 
      AND `12th_percentage` <= 100),
  `grad_course` VARCHAR(30),
  `grad_percentage` NUMERIC(4, 2) 
    CHECK(`grad_percentage` >= 0 
      AND `grad_percentage` <= 100),
  FOREIGN KEY (`register_no`)
    REFERENCES `student`(`register_no`)
      ON DELETE CASCADE
) ENGINE=INNODB;