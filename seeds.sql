USE employee_tracker_db;

INSERT INTO department (name)
VALUES ("auto"), ("bakery"), ("produce");

INSERT INTO role (title, salary, department_id)
VALUES ("Mechanic", 30000, department.auto.id);