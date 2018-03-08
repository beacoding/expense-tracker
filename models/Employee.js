var connection = require('../config/connect');

module.exports = {
  findOne: function(id) {
    return new Promise((resolve, reject) => {
      //TODO queryString to find one employee
      var queryString = `SELECT
                          CONCAT(e.first_name, ' ', e.last_name) as employee_name,
                          CONCAT(manager.first_name, ' ', manager.last_name) as manager_name,
                          e.is_active,
                          e.id,
                          manager.id as manager_id,
                          e.email,
                          e.first_name,
                          e.last_name
                        FROM
                          employee e,
                          employee manager
                        WHERE e.id = ? AND e.manager_id = manager.id`;
      connection.query(queryString, [id], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  },

  transferEmployeesToManagerWithManagerID: function(employee_id, manager_id) {
    return new Promise((resolve, reject) => {
      //TODO queryString to find one employee
      var queryString = `UPDATE employee
                          SET
                            manager_id = ?
                          WHERE 
                            manager_id = ?`;
      connection.query(queryString, [manager_id, employee_id], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  },

  disableOne: function(id) {
    return new Promise((resolve, reject) => {
      //TODO queryString to find one employee
      var queryString = `UPDATE employee
                          SET
                            is_active = 0
                          WHERE 
                            id = ?`;
      connection.query(queryString, [id], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  },

  enableOne: function(id) {
    return new Promise((resolve, reject) => {
      //TODO queryString to find one employee
      var queryString = `UPDATE employee
                          SET
                            is_active = 1
                          WHERE 
                            id = ?`;
      connection.query(queryString, [id], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  },

  findAll: function(id) {
    return new Promise((resolve, reject) => {      
      var queryString = `SELECT
                          CONCAT(e.first_name, ' ', e.last_name) as employee_name,
                          e.is_active,
                          e.id
                        FROM
                          employee e`;
      connection.query(queryString, [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  },

  findAllWithManagers: function(id) {
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

  updatePassword: function(employee) {
    return new Promise((resolve, reject) => {
      var queryString = `UPDATE employee
                          SET
                            password = ?
                          WHERE 
                            id = ?`;
      connection.query(queryString, [employee.password, employee.id], (err, rows) => {
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
