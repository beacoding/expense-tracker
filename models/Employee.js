var connection = require('../config/connect');

module.exports = {
  findOne: function(id) {
    return new Promise((resolve, reject) => {
      //TODO queryString to find one employee
      var queryString = `SELECT
                          CONCAT(e.first_name, ' ', e.last_name) as employee_name,
                          CONCAT(m.first_name, ' ', m.last_name) as manager_name,
                          e.is_active,
                          e.id,
                          m.id as manager_id,
                          e.email,
                          e.first_name,
                          e.last_name
                        FROM
                          employee e
                        LEFT JOIN employee m ON m.id = e.manager_id
                        WHERE e.id = ?`;
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

  // returns all users along with their manager's name, if they have a manager
  findAllWithManagers: function(id) {
    return new Promise((resolve, reject) => {
      var queryString = `SELECT
                          CONCAT(m.first_name, ' ', m.last_name) as manager_name,
                          CONCAT(e.first_name, ' ', e.last_name) as employee_name,
                          e.is_active,
                          e.id
                        FROM
                          employee e
                        LEFT JOIN employee m ON m.id = e.manager_id`;
      connection.query(queryString, [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  },

  // return all employees under a given manager
  findAllWithManagerID: function(manager_id) {
    return new Promise((resolve, reject) => {
      var queryString = `SELECT
                          CONCAT(e.first_name, ' ', e.last_name) as employee_name,
                          e.id
                        FROM
                          employee e,
                          employee m
                        WHERE
                          e.manager_id = m.id AND
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

  findAllWithParams: function(params) {
    return new Promise((resolve, reject) => {
      var whereArray = []
      for (key in params) {
        if (params[key].length > 0) {
          switch(key) {
            case "employee_id":
              whereArray.push("id = '" + params[key] + "'")
              break;
            case "employee_name":
              whereArray.push("(e.first_name LIKE '" + params[key] + "%' OR e.last_name LIKE '" + params[key] + "%')");
              break;
            case "manager_id":
              whereArray.push("m.id = '" + params[key] + "'")
              break;
            case "manager_name":
              whereArray.push("(m.first_name LIKE '" + params[key] + "%' OR m.last_name LIKE '" + params[key] + "%')");
              break;
            default:
              break;
          }
        }
      }

      var whereString = whereArray.length > 0 ? " WHERE " + whereArray.join(" AND ") : "";
      var queryString = `SELECT
                          CONCAT(e.first_name, ' ', e.last_name) as employee_name,
                          CONCAT(m.first_name, ' ', m.last_name) as manager_name,
                          e.is_active,
                          e.id
                        FROM
                          employee e
                        LEFT JOIN employee m ON m.id = e.manager_id` + whereString + ";"

      connection.query(queryString, [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  },

  addOne: function(employee) {
    return new Promise((resolve, reject) => {
      const queryString = 
                          `INSERT INTO employee
                            (id,
                            first_name,
                            last_name,
                            email,
                            password,
                            manager_id,
                            is_admin)
                           VALUES
                            (?, ?, ?, ?, ?, ?, ?)`;
      connection.query(queryString, 
      [
        employee.id,
        employee.first_name,
        employee.last_name,
        employee.email,
        employee.password,
        employee.manager_id,
        employee.is_admin,
      ]
      , (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
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
