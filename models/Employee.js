var connection = require('../config/connect');

module.exports = {
  findOne: function(id) {
    return new Promise((resolve, reject) => {
      //TODO queryString to find one employee
    });
  },

  findAll: function(id) {
    return new Promise((resolve, reject) => {
      var queryString = `SELECT
                          CONCAT(manager.first_name, ' ', manager.last_name) as manager_name,
                          CONCAT(e.first_name, ' ', e.last_name) as employee_name,
                          e.is_active,
                          e.id
                        FROM
                          employee e,
                          employee manager
                        WHERE
                          e.manager_id = manager.id`;
      connection.query(queryString, [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  },

  findAllWithManagerID: function(manager_id) {
    return new Promise((resolve, reject) => {
      var queryString = `SELECT
                          CONCAT(e.first_name, ' ', e.last_name) as employee_name,
                          e.id
                        FROM
                          employee e,
                          employee manager
                        WHERE
                          e.manager_id = manager.id AND
                          manager.id = ?`;
      connection.query(queryString, [manager_id], (err, rows) => {
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

  updateOne: function(id) {
    return new Promise((resolve, reject) => {
      //TODO queryString to update one employee
    }); 
  },

  deleteOne: function(id) {
    return new Promise((resolve, reject) => {
      //TODO queryString to delete one employee
    }); 
  }
}
