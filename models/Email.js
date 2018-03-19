var connection = require('../config/connect');

module.exports = {
  findEmail: function(claimee_id) {
    return new Promise((resolve, reject) => {
      var queryString = `SELECT
                          email
                        FROM
                          employee
                        WHERE
                          employee.id = ?`;
      connection.query(queryString, [claimee_id], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  },


};
