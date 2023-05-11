const inquirer = require('inquirer');
const { QueryClass } = require('./queries');

const queries = new QueryClass();

async function main() {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit',
      ],
    },
  ]);

  switch (action) {
    case 'View all departments':
      const departments = await queries.viewDepartments();
      console.table(departments);
      break;

    case 'View all roles':
      const roles = await queries.viewRoles();
      console.table(roles);
      break;

    case 'View all employees':
      const employees = await queries.viewEmployees();
      console.table(employees);
      break;

    case 'Add a department':
      // Prompt for department name and add it
      break;

    case 'Add a role':
      // Prompt for role details and add it
      break;

    case 'Add an employee':
      // Prompt for employee details and add them
      break;

    case 'Update an employee role':
      // Prompt for employee to update and their new role
      break;

    case 'Exit':
      console.log('Goodbye!');
      process.exit(0);
      break;

    default:
      console.log('Invalid action');
  }

  // Run the main function again to display the menu
  main();
}

main();
