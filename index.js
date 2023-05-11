const inquirer = require('inquirer');
const { QueryClass } = require('./queries');
const queries = new QueryClass();

const mainMenu = async () => {
  const { choice } = await inquirer.prompt({
    type: 'list',
    name: 'choice',
    message: 'What would you like to do?',
    choices: [
      'View all departments',
      'View all roles',
      'View all employees',
      'Add a department',
      'Add a role',
      'Add an employee',
      'Update an employee role',
      'Exit'
    ],
  });

  switch (choice) {
    case 'View all departments':
      // Call queries method to view departments
      break;
    case 'View all roles':
      // Call queries method to view roles
      break;
    case 'View all employees':
      // Call queries method to view employees
      break;
    case 'Add a department':
      // Call queries method to add a department
      break;
    case 'Add a role':
      // Call queries method to add a role
      break;
    case 'Add an employee':
      // Call queries method to add an employee
      break;
    case 'Update an employee role':
      // Call queries method to update an employee role
      break;
    case 'Exit':
      // Exit the application
      process.exit(0);
  }
};

