const db = require("./db");

class QueryClass {
  constructor(db) {
    this.db = db;
  }

  async viewDepartments() {
    const [rows] = await this.db.query("SELECT * FROM department");
    return rows;
  }

  async viewRoles() {
    const [rows] = await this.db.query("SELECT * FROM role");
    return rows;
  }

  async viewEmployees() {
    const [rows] = await this.db.query("SELECT * FROM employee");
    return rows;
  }

  async addDepartment(name) {
    await this.db.query("INSERT INTO department (name) VALUES (?)", [name]);
  }

  async addRole(title, salary, department_id) {
    await this.db.query(
      "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
      [title, salary, department_id]
    );
  }

  async addEmployee(first_name, last_name, role_id, manager_id) {
    await this.db.query(
      "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
      [first_name, last_name, role_id, manager_id]
    );
  }

  async updateEmployeeRole(employee_id, role_id) {
    await this.db.query("UPDATE employee SET role_id = ? WHERE id = ?", [
      role_id,
      employee_id,
    ]);
  }

  async updateEmployeeManager(employee_id, manager_id) {
    await this.db.query("UPDATE employee SET manager_id = ? WHERE id = ?", [
      manager_id,
      employee_id,
    ]);
  }

  async viewEmployeesByManager(manager_id) {
    const [rows] = await this.db.query("SELECT * FROM employee WHERE manager_id = ?", [manager_id]);
    return rows;
  }

  async viewEmployeesByDepartment(department_id) {
    const [rows] = await this.db.query(
      `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
      FROM employee
      LEFT JOIN role ON employee.role_id = role.id
      LEFT JOIN department ON role.department_id = department.id
      LEFT JOIN employee manager ON employee.manager_id = manager.id
      WHERE department.id = ?`,
      [department_id]
    );
    return rows;
  }

  async deleteDepartment(department_id) {
    await this.db.query("DELETE FROM department WHERE id = ?", [department_id]);
  }

  async deleteRole(role_id) {
    await this.db.query("DELETE FROM role WHERE id = ?", [role_id]);
  }

  async deleteEmployee(employee_id) {
    await this.db.query("DELETE FROM employee WHERE id = ?", [employee_id]);
  }

  async viewDepartmentBudget(department_id) {
    const [rows] = await this.db.query(
      `SELECT department.id, department.name, SUM(role.salary) AS utilized_budget
      FROM employee
      JOIN role ON employee.role_id = role.id
      JOIN department ON role.department_id = department.id
      WHERE department.id = ?
      GROUP BY department.id, department.name`,
      [department_id]
    );
    return rows;
  }

  async getEmployeesByRoleId(roleId) {
    const [rows] = await this.db.query("SELECT * FROM employee WHERE role_id = ?", [roleId]);
    return rows;
  }
}

module.exports = new QueryClass(db);
