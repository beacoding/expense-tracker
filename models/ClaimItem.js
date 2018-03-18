var connection = require('../config/connect');

module.exports = {
  findAllWithClaim: function(claim_id) {
    return new Promise((resolve, reject) => {
      const queryString=`
        SELECT 
          claim_item.id as claim_item_id,
          claim_item.description,
          claim_item.amount,
          claim_item.comment,
          expense_type.category as expense_category,
          claim_item.image_url
        FROM
          claim,
          claim_item,
          expense_type
        WHERE
          claim.id = claim_item.claim_id AND
          expense_type.id = claim_item.expense_type AND
          claim_id = ?`
      connection.query(queryString, [claim_id], (err, rows) => {
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
      const queryString=`
        SELECT 
          claim_item.id as claim_item_id,
          claim_item.description,
          claim_item.amount,
          claim_item.comment,
          expense_type.category as expense_category,
          claim_item.image_url
        FROM
          claim,
          claim_item,
          expense_type
        WHERE
          claim.id = claim_item.claim_id AND
          expense_type.id = claim_item.expense_type AND
          claim_item.id = ?`
      connection.query(queryString, [id], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  },
  
  addOne: function(item) {
    return new Promise((resolve, reject) => {
      const queryString = `INSERT INTO claim_item
                            (claim_id,
                              description,
                              amount,
                              comment,
                              expense_type,
                              image_url)
                            VALUES
                              (?, ?, ?, ?, ?, ?)`;
      connection.query(queryString, 
        [
          item.claim_id,
          item.description,
          item.amount,
          item.comment,
          item.expense_type,
          item.image_url
        ],
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    }); 
  },
  
  
  updateOne: function(params, id) {
    return new Promise((resolve, reject) => {
      //TODO queryString to update one claimItem
      var setArray = [];
      for (key in params) {
          switch(key) {
            case "amount":
              setArray.push("claim_item.amount = '" + parseFloat(params[key]) + "'");
              break;
            case "description":
              setArray.push("claim_item.description = '" + params[key] + "'");
              break;
            case "expense_type":
              setArray.push("claim_item.expense_type = '" + parseInt(params[key]) + "'");
              break;
            case "comment":
              setArray.push("claim_item.comment = '" + params[key] + "'");
              break;
            default:
              break;
          }
      }

     var setString = setArray.length > 0 ? setArray.join(" AND ") : "";
        const queryString = `UPDATE claim_item
                              SET ` + 
                              setString + 
                              ` WHERE 
                                claim_item.id = ?`;
        console.log(queryString);
        connection.query(queryString, [ id ], (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows[0]);
          }
        });
    });
  },
  
  deleteOne: function(claim_item_id) {
    return new Promise((resolve, reject) => {
      const queryString = `DELETE FROM claim_item WHERE id = ?`;
      connection.query(queryString, 
        [
        claim_item_id
        ],
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    }); 
  },

  updateReceipt: function(item, claim_item_id) {
    return new Promise((resolve, reject) => {
      const queryString = `UPDATE claim_item SET claim_item.image_url = ? WHERE claim_item.id = ?`;
      console.log(item);
      connection.query(queryString, 
        [
        item.image_url,
        claim_item_id
        ],
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
}