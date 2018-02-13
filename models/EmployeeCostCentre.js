var connection = require('../config/connect');

module.exports = {
  findAll: function() {
    return new Promise((resolve, reject) => {
      var queryString = `SELECT
                          CONCAT(first_name, ' ', last_name) as manager_name,
                          employee_id,
                          cost_centre_id,
                          approval_limit
                        FROM
                          employee_cost_centre e,
                          employee manager
                        WHERE
                          e.employee_id = manager.id`;
      connection.query(queryString, [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  },

  findAllByEmployee: function(employee) {
    return new Promise((resolve, reject) => {
      var queryString = `SELECT *
                        FROM
                          employee_cost_centre
                        WHERE 
                          employee_id = ?`;
      connection.query(queryString, [employee.id], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  },

  findForwardManagers: function(cost_centre_id) {
    return new Promise((resolve, reject) => {
      var queryString =  `SELECT
                            CONCAT(first_name, ' ', last_name) as manager_name,
                            employee_id,
                            cost_centre_id,
                            approval_limit
                          FROM
                            employee_cost_centre e,
                            employee manager
                          WHERE
                            e.employee_id = manager.id AND
                            e.cost_centre_id = ?`;
      connection.query(queryString, [cost_centre_id], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  },

  updateOne: function(employee_id, cost_centre_id, approval_limit) {
    return new Promise((resolve, reject) => {
      var queryString = `UPDATE employee_cost_centre
                          SET
                            approval_limit = ?
                          WHERE 
                            employee_id = ? AND
                            cost_centre_id = ?`;
      connection.query(queryString, [approval_limit, employee_id, cost_centre_id], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  },

  addOne: function(newApprovalRight) {
    return new Promise((resolve, reject) => {
      const queryString = 
                          `INSERT INTO employee_cost_centre
                            (employee_id, cost_centre_id, approval_limit)
                           VALUES
                            (?, ?, ?)`;
      connection.query(queryString, 
      [
        newApprovalRight.employee_id,
        newApprovalRight.cost_centre_id,
        newApprovalRight.approval_limit
      ]
      , (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    }); 
  }
}
