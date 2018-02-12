var connection = require('../config/connect');

module.exports = {
  findAllWithEmployee: function(employee) {
    return new Promise((resolve, reject) => {
      //TODO queryString to fetch all employee claims with employee
      //must get manager first name, manager last name, expense_type as string
      //must join with employee, and expense types
      var queryString = `SELECT 
                            claim.id as claim_id, 
                            claimee.first_name as claimee_first_name,
                            claimee.last_name as claimee_last_name, 
                            claimee.email as claimee_email,
                            approver.first_name as approver_first_name,
                            approver.last_name as approver_last_name, 
                            approver.email as approver_email,
                            company.name as company_name,
                            claim.cost_centre_id,
                            claim.account_number,
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
                            claim.company_id = company.id AND
                            claimee.email = ?`;
      connection.query(queryString, [employee.email], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  },

  findPendingApprovalsByManager: function(employee) {
    return new Promise((resolve, reject) => {
      //TODO queryString to fetch all employee claims with employee
      //must get employee first name, employee last name, expense_type as string
      //must join with employee, and expense types
      var queryString = `SELECT 
                          claim.id as claim_id, 
                          claimee.first_name as claimee_first_name,
                          claimee.last_name as claimee_last_name, 
                          claimee.email as claimee_email,
                          approver.first_name as approver_first_name,
                          approver.last_name as approver_last_name, 
                          approver.email as approver_email,
                          company.name as company_name,
                          claim.cost_centre_id,
                          claim.account_number,
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
                          claim.company_id = company.id AND
                          (claim.status = 'S' OR claim.status = 'F') AND
                          approver.id = ?`;
      connection.query(queryString, [employee.id], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  },

  updateStatus: function(claim_id, approver_id, status) {
    return new Promise((resolve, reject) => {
      var queryString = `UPDATE claim
                          SET 
                            claim.approver_id = ?,
                            claim.status = ?,
                            claim.date_modified = NOW()
                          WHERE 
                            claim.id = ?`;
      connection.query(queryString, [approver_id, status, claim_id], (err, rows) => {
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
    //TODO queryString to add one claim
    //MISSING PAYROLL FIELD!!!!!
    console.log(claim);
    return new Promise((resolve, reject) => {
      const queryString = 
                          `INSERT INTO claim
                            (claimee_id,
                             approver_id,
                             company_id,
                             cost_centre_id,
                             description,
                             account_number,
                             notes,
                             status,
                             date_created,
                             date_modified)
                           VALUES
                            ( ?,?,?,?,?,?,?,?,  NOW(), NOW())`;
      connection.query(queryString, 
      [
        claim.claimeeid,
        claim.approverid,
        claim.companyid,
        claim.costcenter,
        claim.description,
        claim.acc_number,
        claim.notes,
        claim.status
      ]
      , (err, rows) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          console.log(rows);          
          resolve(rows);
        }
      });
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
