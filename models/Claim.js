var connection = require('../config/connect');

module.exports = {
  findAllWithEmployee: function(employee) {
    return new Promise((resolve, reject) => {
      //TODO queryString to fetch all employee claims with employee
      //must get manager first name, manager last name, expensee_type as string
      //must join with employee, and expense types
      var queryString = `SELECT 
                            claim.id as claim_id, 
                            approver.first_name as approver_first_name,
                            approver.last_name as approver_last_name, 
                            approver.email as approver_email,
                            company.name as company_name,
                            claim.cost_centre_id,
                            claim.description, 
                            claim.notes,
                            claim.status, 
                            claim.date_created
                           FROM
                            claim, 
                            employee claimee, 
                            employee approver,
                            company
                           WHERE 
                            claimee.id = claim.claimee_id AND 
                            approver.id = claim.approver_id AND  
                            claimee.id = ?`;
      connection.query(queryString, [employee.id], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  },

  findOne: function(id) {
    return new Promise((resolve, reject) => {
      //TODO queryString to fetch all employee claims with id
    });
  },

  addOne: function(claim) {
    return new Promise((resolve, reject) => {
      //TODO queryString to add one claim
    }); 
  },

  updateOne: function(claim) {
    return new Promise((resolve, reject) => {
      //TODO queryString to update one claim
    }); 
  },

  deleteOne: function(claim) {
    return new Promise((resolve, reject) => {
      //TODO queryString to delete one claim
    }); 
  }
}
