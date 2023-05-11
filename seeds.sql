-- Insert sample data into the department table
INSERT INTO department (name)
VALUES ('Sales'),
       ('Engineering'),
       ('Finance'),
       ('Human Resources');

-- Insert sample data into the role table
INSERT INTO role (title, salary, department_id)
VALUES ('Sales Manager', 90000, 1),
       ('Sales Associate', 60000, 1),
       ('Software Engineer', 80000, 2),
       ('Lead Engineer', 100000, 2),
       ('Accountant', 70000, 3),
       ('HR Manager', 75000, 4);

-- Insert sample data into the employee table
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Doe', 1, NULL),
       ('Jane', 'Smith', 2, 1),
       ('Mike', 'Johnson', 3, 2),
       ('Sarah', 'Williams', 4, 2),
       ('Karen', 'Brown', 5, NULL),
       ('Michael', 'Miller', 6, 5);
