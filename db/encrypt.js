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
  console.log("Connected!");
  con.query('use cc_expense_claims_system', function (err, result) {
    if (err) throw err;
    console.log("Result: " + JSON.stringify(result));
  });
  con.query('select * from employee', function(err, res) {
    if (err) {
      throw err;
    }
    async.each(res, function(row, callback) {
      var hash = bcrypt.hashSync(row.password);
      var sql = 'update employee set password="' + hash + '" where employee.id=' +  row.id + ';'
      console.log(sql)
      con.query(sql, function(err, res) {
        if (err) {
          console.error("Error:", err);
          callback(err);
        } else {
          console.log("updated!", res);
          callback()
        }
      });
      return row;
    }, function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log("processed");
      }
    });
  });
});
