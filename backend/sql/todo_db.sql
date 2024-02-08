CREATE DATABASE todo_db;

USE todo_db;
CREATE TABLE todos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT false
);
set SQL_SAFE_UPDATES = 0;
delete from todos where completed = 0;
select * from todos;
