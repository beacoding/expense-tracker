var mysql = require('mysql');
var dbconfig = require('../config/database');

var connection = mysql.createConnection(dbconfig.connection);

console.log('Success: Database Created!')

connection.end();
