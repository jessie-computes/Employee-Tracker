USE employee_tracker_db;

INSERT INTO department (name)
VALUES ("auto"), ("bakery"), ("produce");

INSERT INTO role (title, salary, department_id)
VALUES ("Mechanic", 30000, department.auto.id), ("Baker", 20000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES("Jessie", "Everett", 1, 1), ("Lauren", "Everett", 2, 2);