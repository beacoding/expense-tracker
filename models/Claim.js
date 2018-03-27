var connection = require('../config/connect');

module.exports = {
  findAllWithEmployee: function(employee) {
    return new Promise((resolve, reject) => {
      var queryString = `SELECT 
                            claim.id as claim_id, 
                            claimant.id as claimant_id,
                            claimant.first_name as claimant_first_name,
                            claimant.last_name as claimant_last_name, 
                            claimant.email as claimant_email,
                            approver.id as approver_id,                            
                            approver.first_name as approver_first_name,
                            approver.last_name as approver_last_name, 
                            approver.email as approver_email,
                            company.name as company_name,
                            claim.cost_centre_id,
                            claim.account_number,
                            claim.description, 
                            claim.notes,
                            claim.status, 
                            claim.date_created,
                            manager.id as manager_id,
                            manager.first_name as manager_first_name,
                            manager.last_name as manager_last_name,
                            manager.email as manager_email
                           FROM
                            claim, 
                            employee claimant, 
                            employee approver,
                            employee manager,
                            company
                           WHERE 
                            claimant.id = claim.claimant_id AND 
                            approver.id = claim.approver_id AND
                            claimant.manager_id = manager.id AND
                            claim.company_id = company.id AND
                            claimant.email = ?`;
      connection.query(queryString, [employee.email], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  },

  findAllWithParams: function(params, employee) {
    return new Promise((resolve, reject) => {
      // build params
      var whereArray = [];
      var orArray = [];

      for (key in params) {
        if (params[key].length > 0) {
           switch(key) {
            case "employee_id":
              whereArray.push("claimant.id = '" + params[key] + "'")
              break;
            case "approver_id":
              whereArray.push("approver.id = '" + params[key] + "'")
              break;
            case "employee_name":
              whereArray.push("(claimant.first_name LIKE '" + params[key] + "%' OR claimant.last_name LIKE '" + params[key] + "%')");
              break;
            case "employee_email":
              whereArray.push("claimant.email LIKE '%" + params[key] + "%'");
              break;
            case "approver_name":
              whereArray.push("(approver.first_name LIKE '" + params[key] + "%' OR approver.last_name LIKE '" + params[key] + "%')");
              break;
            case "approver_email":
              whereArray.push("approver.email LIKE '" + params[key] + "%'");
              break;
            case "submitted":
              orArray.push("claim.status = " + "'S'")
              break;
            case "approved":
              if (params[key] === 'true') {
                orArray.push("claim.status = " + "'A'")
              } else {
                whereArray.push("claim.status != " + "'A'")
              }
              break;
            case "declined":
              if (params[key] === 'true') {
                orArray.push("claim.status = " + "'D'")
              } else {
                whereArray.push("claim.status != " + "'D'")
              }
              break;
            case "pending":
              if (params[key] === 'true') {
                orArray.push("claim.status = 'S' OR claim.status = 'F'")
              } else {
                whereArray.push("claim.status != 'S' AND claim.status != 'F'")
              }
              break;
            case "drafts":
              if (params[key] === 'true') {
                orArray.push("claim.status = " + "'P'")
              } else {
                whereArray.push("claim.status != " + "'P'")
              }
            case "start":
              if (params["end"].length > 0) {
                whereArray.push("claim.date_created BETWEEN '" + params["start"] + "' AND '" + params["end"] + "'")
              }
              break;
            case "end":
              if (params["start"].length > 0) {
                whereArray.push("claim.date_created BETWEEN '" + params["start"] + "' AND '" + params["end"] + "'")
              }
              break;
            default:
              break;
           }
        }
      }

      var orString = orArray.length > 0 ? (" AND (" + orArray.join(" OR ") + ")" ) : ""; 
      var whereString = whereArray.length > 0 ? " AND " + whereArray.join(" AND ") : "";
      whereString += orString;

      var queryString = `SELECT 
                            claim.id as claim_id, 
                            claimant.id as claimant_id,
                            claimant.first_name as claimant_first_name,
                            claimant.last_name as claimant_last_name, 
                            claimant.email as claimant_email,
                            approver.id as approver_id,                            
                            approver.first_name as approver_first_name,
                            approver.last_name as approver_last_name, 
                            approver.email as approver_email,
                            company.name as company_name,
                            claim.cost_centre_id,
                            claim.account_number,
                            claim.description, 
                            claim.notes,
                            claim.status, 
                            claim.date_created,
                            manager.id as manager_id,
                            manager.first_name as manager_first_name,
                            manager.last_name as manager_last_name,
                            manager.email as manager_email
                          FROM
                            claim, 
                            employee claimant
                          LEFT JOIN employee manager ON manager.id = claimant.manager_id,
                            employee approver,
                            company
                          WHERE 
                            claimant.id = claim.claimant_id AND 
                            approver.id = claim.approver_id AND
                            claim.company_id = company.id` + whereString + ";"
      connection.query(queryString, [employee.id], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  },

  findOneWithClaimID: function(claim_id) {
    return new Promise((resolve, reject) => {
      var queryString = `SELECT 
                            claim.id as claim_id, 
                            claimant.id as claimant_id,
                            claimant.first_name as claimant_first_name,
                            claimant.last_name as claimant_last_name, 
                            claimant.email as claimant_email,
                            approver.id as approver_id,                            
                            approver.first_name as approver_first_name,
                            approver.last_name as approver_last_name, 
                            approver.email as approver_email,
                            company.name as company_name,
                            claim.cost_centre_id,
                            claim.account_number,
                            claim.description, 
                            claim.notes,
                            claim.status, 
                            claim.date_created,
                            manager.id as manager_id,
                            manager.first_name as manager_first_name,
                            manager.last_name as manager_last_name,
                            manager.email as manager_email
                           FROM
                            claim, 
                            employee claimant, 
                            employee approver,
                            employee manager,
                            company
                           WHERE 
                            claimant.id = claim.claimant_id AND 
                            approver.id = claim.approver_id AND
                            claim.company_id = company.id AND
                            claimant.manager_id = manager.id AND
                            claim.id = ?`;
      connection.query(queryString, [claim_id], (err, rows) => {
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
      var queryString = `SELECT 
                          claim.id as claim_id, 
                          claimant.id as claimant_id,
                          claimant.first_name as claimant_first_name,
                          claimant.last_name as claimant_last_name, 
                          claimant.email as claimant_email,
                          approver.id as approver_id,                            
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
                          employee claimant, 
                          employee approver,
                          company
                        WHERE 
                          claimant.id = claim.claimant_id AND 
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

  findProcessedApprovalsByManager: function(employee) {
    return new Promise((resolve, reject) => {
      var queryString = `SELECT 
                          claim.id as claim_id, 
                          claimant.id as claimant_id,
                          claimant.first_name as claimant_first_name,
                          claimant.last_name as claimant_last_name, 
                          claimant.email as claimant_email,
                          approver.id as approver_id,                            
                          approver.first_name as approver_first_name,
                          approver.last_name as approver_last_name, 
                          approver.email as approver_email,
                          company.name as company_name,
                          claim.cost_centre_id,
                          claim.account_number,
                          claim.description, 
                          claim.notes,
                          claim.status, 
                          claim.date_created,
                          manager.id as manager_id,
                          manager.first_name as manager_first_name,
                          manager.last_name as manager_last_name,
                          manager.email as manager_email
                        FROM
                          claim, 
                          employee claimant, 
                          employee approver,
                          employee manager,
                          company
                        WHERE 
                          claimant.id = claim.claimant_id AND 
                          approver.id = claim.approver_id AND
                          claim.company_id = company.id AND
                          claimant.manager_id = manager.id AND
                          (claim.status = 'A' OR claim.status = 'D') AND
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

  updateStatus: function(claim_id, approver_id, status, notes) {
    return new Promise((resolve, reject) => {
      var queryString = `UPDATE claim
                          SET 
                            claim.approver_id = ?,
                            claim.status = ?,
                            claim.notes = ?,
                            claim.date_modified = NOW()
                          WHERE 
                            claim.id = ?`;
      connection.query(queryString, [approver_id, status, notes, claim_id], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  },

  addOne: function(claim) {
    return new Promise((resolve, reject) => {
      const queryString = 
                          `INSERT INTO claim
                            (claimant_id,
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
                            (?, ?, ?, ?, ?, ?, NULL, ?, NOW(), NOW())`;
      connection.query(queryString, 
      [
        claim.claimant_id,
        claim.approver_id,
        claim.company_id,
        claim.cost_centre_id,
        claim.description,
        claim.account_number,
        claim.status
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

  transferClaimsToNextManager: function(old_manager_id, new_manager_id) {
    return new Promise((resolve, reject) => {
      var queryString = `UPDATE claim
                          SET
                            approver_id = ?,
                            date_modified = NOW()
                          WHERE 
                            approver_id = ? AND status = 'S' OR status = 'F'`;
      connection.query(queryString, [new_manager_id, old_manager_id], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  },

  deleteClaimDraftsOnDisablingUser: function(employee_id) {
    return new Promise((resolve, reject) => {
      var queryString = `DELETE FROM claim WHERE status = 'P' AND claimant_id = ?`;
      connection.query(queryString, [employee_id], (err, rows) => {
        if (err) {
          reject(err);
        } else {
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

  deleteOne: function(claim_id) {
    return new Promise((resolve, reject) => {
      const queryString = `DELETE FROM claim WHERE id = ?`;
      connection.query(queryString, 
      [
        claim_id
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
