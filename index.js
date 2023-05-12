const inquirer = require("inquirer");
const QueryClass = require('./queries');
const db = require('./db');

const queries = require('./queries');



async function main() {
    let departments, roles, employees; // Declare all variables at the start
  
    const { action } = await inquirer.prompt([
      {
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "View employees by manager",
          "View employees by department",
          "View total department budget",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
          "Update an employee manager",
          "Delete a department",
          "Delete a role",
          "Delete an employee",
          "Exit",
        ],
      },
    ]);
    
    switch (action) {
        case "View all departments":
          departments = await queries.viewDepartments();
          console.table(departments);
          break;
    
        case "View all roles":
          roles = await queries.viewRoles();
          console.table(roles);
          break;
    
        case "View all employees":
          employees = await queries.viewEmployees();
          console.table(employees);
          break;
    
        case "View employees by manager":
          employees = await queries.viewEmployeesByManager();
          console.table(employees);
          break;
    
        case "View employees by department":
          departments = await queries.viewEmployeesByDepartment();
          console.table(departments);
          break;
    
        case "View total department budget":
          const budget = await queries.viewTotalDepartmentBudget();
          console.log(`Total budget: ${budget}`);
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
      const departmentsToAddRole = await queries.viewDepartments();
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
          choices: departmentsToAddRole.map((department) => ({
            name: department.name,
            value: department.id,
          })),
        },
      ]);
      await queries.addRole(title, salary, departmentId);
      console.log(`Added role: ${title}`);
      break;

    case "Add an employee":
      const rolesToAddEmployee = await queries.viewRoles();
      const employeesToAddEmployee = await queries.viewEmployees();
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
          choices: rolesToAddEmployee.map((role) => ({
            name: role.title,
            value: role.id,
          })),
        },
        {
          type: "list",
          name: "managerId",
          message: "Select the manager for the new employee:",
          choices: [
            {
              name: "None",
              value: null,
            },
            ...employeesToAddEmployee.map((employee) => ({
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
      const employeesToUpdateRole = await queries.viewEmployees();
      const rolesToUpdateRole = await queries.viewRoles();
      const { employeeId, newRoleId } = await inquirer.prompt([
        {
          type: "list",
          name: "employeeId",
          message: "Select the employee to update:",
          choices: employeesToUpdateRole.map((employee) => ({
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id,
          })),
        },
        {
          type: "list",
          name: "newRoleId",
          message: "Select the new role for the employee:",
          choices: rolesToUpdateRole.map((role) => ({
            name: role.title,
            value: role.id,
          })),
        },
      ]);
      await queries.updateEmployeeRole(employeeId, newRoleId);
      console.log(`Updated role for employee with ID ${employeeId}`);
      break;

    case "Update employee manager":
      employees = await queries.viewEmployees();
      const { employeeIdToUpdateManager, newManagerId } = await inquirer.prompt(
        [
          {
            type: "list",
            name: "employeeIdToUpdateManager",
            message: "Select the employee to update their manager:",
            choices: employees.map((employee) => ({
              name: `${employee.first_name} ${employee.last_name}`,
              value: employee.id,
            })),
          },
          {
            type: "list",
            name: "newManagerId",
            message: "Select the new manager for the employee:",
            choices: [
              {
                name: "None",
                value: null,
              },
              ...employees.map((employee) => ({
                name: `${employee.first_name} ${employee.last_name}`,
                value: employee.id,
              })),
            ],
          },
        ]
      );
      await queries.updateEmployeeManager(
        employeeIdToUpdateManager,
        newManagerId
      );
      console.log(
        `Updated manager for employee with ID ${employeeIdToUpdateManager}`
      );
      break;

    case "View employees by manager":
      employees = await queries.viewEmployeesByManager();
      console.table(employees);
      break;

    case "View employees by department":
      employees = await queries.viewEmployeesByDepartment();
      console.table(employees);
      break;

    case "Delete a department":
      departments = await queries.viewDepartments();
      const { departmentIdToDelete } = await inquirer.prompt([
        {
          type: "list",
          name: "departmentIdToDelete",
          message: "Select the department to delete:",
          choices: departments.map((department) => ({
            name: department.name,
            value: department.id,
          })),
        },
      ]);
      await queries.deleteDepartment(departmentIdToDelete);
      console.log(`Deleted department with ID ${departmentIdToDelete}`);
      break;

      case "Delete a role":
        roles = await queries.viewRoles();
        const { roleIdToDelete } = await inquirer.prompt([
          {
            type: "list",
            name: "roleIdToDelete",
            message: "Select the role to delete:",
            choices: roles.map((role) => ({ name: role.title, value: role.id })),
          },
        ]);
      
        // Get all employees assigned to the role to be deleted
        const employeesInRole = await queries.getEmployeesByRoleId(roleIdToDelete);
      
        if (employeesInRole.length > 0) {
          // If there are employees assigned to the role, ask the user to reassign them to a new role
          roles = await queries.viewRoles();
          const { newRoleId } = await inquirer.prompt([
            {
              type: "list",
              name: "newRoleId",
              message: "This role has employees assigned to it. Please select a new role for these employees:",
              choices: roles
                .filter((role) => role.id !== roleIdToDelete)
                .map((role) => ({ name: role.title, value: role.id })),
            },
          ]);
      
          // Update each employee's role
          for (let employee of employeesInRole) {
            await queries.updateEmployeeRole(employee.id, newRoleId);
          }
        }
      
        // Now that no employees are assigned to the role, it can be deleted
        await queries.deleteRole(roleIdToDelete);
        console.log(`Deleted role with ID ${roleIdToDelete}`);
        break;
      

    case "Delete an employee":
      employees = await queries.viewEmployees();
      const { employeeIdToDelete } = await inquirer.prompt([
        {
          type: "list",
          name: "employeeIdToDelete",
          message: "Select the employee to delete:",
          choices: employees.map((employee) => ({
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id,
          })),
        },
      ]);
      await queries.deleteEmployee(employeeIdToDelete);
      console.log(`Deleted employee with ID ${employeeIdToDelete}`);
      break;

    case "View the utilized budget of a department":
      departments = await queries.viewDepartments();
      const { departmentIdToViewBudget } = await inquirer.prompt([
        {
          type: "list",
          name: "departmentIdToViewBudget",
          message: "Select the department to view its utilized budget:",
          choices: departments.map((department) => ({
            name: department.name,
            value: department.id,
          })),
        },
      ]);
      const utilizedBudget = await queries.viewDepartmentBudget(
        departmentIdToViewBudget
      );
      console.log(
        `Utilized budget for department ID ${departmentIdToViewBudget}: $${utilizedBudget}`
      );
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
