const inquirer = require("inquirer");
const { QueryClass } = require("./queries");

const queries = new QueryClass();

async function main() {
  const { action } = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "What would you like to do?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee role",
        "Exit",
      ],
    },
  ]);

  switch (action) {
    case "View all departments":
      const departments = await queries.viewDepartments();
      console.table(departments);
      break;

    case "View all roles":
      const roles = await queries.viewRoles();
      console.table(roles);
      break;

    case "View all employees":
      const employees = await queries.viewEmployees();
      console.table(employees);
      break;

    case "Add a department":
      const { departmentName } = await inquirer.prompt([
        {
          type: "input",
          name: "departmentName",
          message: "Enter the name of the new department:",
        },
      ]);
      await queries.addDepartment(departmentName);
      console.log(`Added department: ${departmentName}`);
      break;

    case "Add a role":
      const departments = await queries.viewDepartments();
      const { title, salary, departmentId } = await inquirer.prompt([
        {
          type: "input",
          name: "title",
          message: "Enter the title of the new role:",
        },
        {
          type: "input",
          name: "salary",
          message: "Enter the salary for the new role:",
          validate: (value) => !isNaN(value) || "Salary must be a number",
        },
        {
          type: "list",
          name: "departmentId",
          message: "Select the department for the new role:",
          choices: departments.map((department) => ({
            name: department.name,
            value: department.id,
          })),
        },
      ]);
      await queries.addRole(title, salary, departmentId);
      console.log(`Added role: ${title}`);
      break;

    case "Add an employee":
      const roles = await queries.viewRoles();
      const employees = await queries.viewEmployees();
      const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
        {
          type: "input",
          name: "firstName",
          message: "Enter the first name of the new employee:",
        },
        {
          type: "input",
          name: "lastName",
          message: "Enter the last name of the new employee:",
        },
        {
          type: "list",
          name: "roleId",
          message: "Select the role for the new employee:",
          choices: roles.map((role) => ({ name: role.title, value: role.id })),
        },
        {
          type: "list",
          name: "managerId",
          message: "Select the manager for the new employee:",
          choices: [
            { name: "None", value: null },
            ...employees.map((employee) => ({
              name: `${employee.first_name} ${employee.last_name}`,
              value: employee.id,
            })),
          ],
        },
      ]);
      await queries.addEmployee(firstName, lastName, roleId, managerId);
      console.log(`Added employee: ${firstName} ${lastName}`);
      break;

    case "Update an employee role":
      const employees = await queries.viewEmployees();
      const roles = await queries.viewRoles();
      const { employeeId, newRoleId } = await inquirer.prompt([
        {
          type: "list",
          name: "employeeId",
          message: "Select the employee to update:",
          choices: employees.map((employee) => ({
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id,
          })),
        },
        {
          type: "list",
          name: "newRoleId",
          message: "Select the new role for the employee:",
          choices: roles.map((role) => ({ name: role.title, value: role.id })),
        },
      ]);
      await queries.updateEmployeeRole(employeeId, newRoleId);
      console.log(`Updated role for employee with ID ${employeeId}`);
      break;

    case "Exit":
      console.log("Goodbye!");
      process.exit(0);
      break;

    default:
      console.log("Invalid action");
  }

  // Run the main function again to display the menu
  main();
}

main();
