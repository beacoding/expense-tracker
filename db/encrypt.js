var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var async = require('async');

var con = mysql.createConnection({
  host: "localhost",
  user: "app_user",
  password: "cc_ecs_winter_t2"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Running Script to Hash User Passwords...");
  console.log("Connected to Database.");  
  con.query('USE cc_expense_claims_system', function (err, result) {
    if (err) throw err;
    console.log("Processing Users...");
  });
  con.query('SELECT * FROM employee', function(err, res) {
    if (err) {
      throw err;
    }
    async.each(res, function(row, callback) {
      var hash = bcrypt.hashSync(row.password);
      var sql = 'UPDATE employee SET password = "' + hash + '" where employee.id = ' +  row.id + ';'
      con.query(sql, function(err, res) {
        if (err) {
          console.error("Error Attempting:", err);
          console.error(sql);
          console.error("Error: ", err);          
          callback(err);
        } else {
          callback()
        }
      });
      return row;
    }, function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Done!");
        process.exit(0);
      }
    });
  });
});
