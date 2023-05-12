const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '$Snake666',
  database: 'employee_management',
});

module.exports = db;

