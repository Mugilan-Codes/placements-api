CREATE TABLE IF NOT EXISTS `courses` (
  `course_id` VARCHAR(5) PRIMARY KEY,
  `degree` ENUM('UG', 'PG') NOT NULL,
  `short_name` VARCHAR(5) UNIQUE,
  `course_name` VARCHAR(50) NOT NULL UNIQUE,
  `department` VARCHAR(50) NOT NULL
) ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS `student` (
  `register_no` VARCHAR(15) PRIMARY KEY,
  `name`,
  `email`,
  `stud_email`,
  `course_id` VARCHAR(5),
  FOREIGN KEY (`course_id`) 
    REFERENCES `courses`(`course_id`) 
      ON UPDATE CASCADE
) ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS `marks` (
  `register_no` VARCHAR(15) PRIMARY KEY,
  `cgpa`,
  `active_backlog`,
  `backlog_history`,
  FOREIGN KEY (`register_no`) 
    REFERENCES `student`(`register_no`) 
      ON DELETE CASCADE
) ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS `education` (
  `register_no` VARCHAR(15) PRIMARY KEY,
  `10th_board`,
  `10th_percentage`,
  `12th_board`,
  `12th_percentage`,
  `grad_course`,
  `grad_percentage`,
  FOREIGN KEY (`register_no`)
    REFERENCES `student`(`register_no`)
      ON DELETE CASCADE
) ENGINE=INNODB;