const db = require('./db');

class QueryClass {
  async viewDepartments() {
    const [rows] = await db.query('SELECT * FROM department');
    return rows;
  }

  async viewRoles() {
    const [rows] = await db.query(`
      SELECT role.id, role.title, role.salary, department.name AS department
      FROM role
      JOIN department ON role.department_id = department.id
    `);
    return rows;
  }

  async viewEmployees() {
    const [rows] = await db.query(`
      SELECT e.id, e.first_name, e.last_name, role.title, department.name AS department, role.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
      FROM employee e
      LEFT JOIN role ON e.role_id = role.id
      LEFT JOIN department ON role.department_id = department.id
      LEFT JOIN employee m ON e.manager_id = m.id
    `);
    return rows;
  }

  async addDepartment(name) {
    const result = await db.query('INSERT INTO department (name) VALUES (?)', [name]);
    return result;
  }

  async addRole(title, salary, department_id) {
    const result = await db.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, department_id]);
    return result;
  }

  async addEmployee(first_name, last_name, role_id, manager_id) {
    const result = await db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [first_name, last_name, role_id, manager_id]);
    return result;
  }

  async updateEmployeeRole(employee_id, new_role_id) {
    const result = await db.query('UPDATE employee SET role_id = ? WHERE id = ?', [new_role_id, employee_id]);
    return result;
  }
}

module.exports = {
  QueryClass,
};
