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
        expense_types.category as expense_category,
        claim_item.image_url,
        claim_item.has_receipt
      FROM
        claim,
        claim_item,
        expense_types
      WHERE
        claim.id = claim_item.claim_id AND
        expense_types.id = claim_item.expense_type AND
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
      //TODO queryString to find one claim item
    });
  },

  addOne: function(claimItem) {
    return new Promise((resolve, reject) => {
      //TODO queryString to add one claimItem
    }); 
  },

  updateOne: function(claimItem) {
    return new Promise((resolve, reject) => {
      //TODO queryString to update one claimItem
    }); 
  },

  deleteOne: function(claimItem) {
    return new Promise((resolve, reject) => {
      //TODO queryString to delete one claimItem
    }); 
  }
}
