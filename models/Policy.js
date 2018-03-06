var connection = require('../config/connect');

module.exports = {

  findAll: function(id) {
    return new Promise((resolve, reject) => {
      var queryString = `SELECT * FROM policy`;
      connection.query(queryString, [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  },

  addOne: function(id) {
    return new Promise((resolve, reject) => {
      //TODO queryString to add one employee
    }); 
  },

  updateOne: function(name, value) {
    return new Promise((resolve, reject) => {
      //TODO queryString to update one employee
      var queryString = `UPDATE policy
                          SET
                            value = ?
                          WHERE 
                            name = ?`;
      connection.query(queryString, [value, name], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    }); 
  },

  deleteOne: function(id) {
    return new Promise((resolve, reject) => {
      //TODO queryString to delete one employee
    }); 
  }
}
