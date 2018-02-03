var connection = require('../config/connect');

module.exports = {
  findAllWithClaim: function(claim) {
    return new Promise((resolve, reject) => {
      //TODO queryString to fetch all claim items for a particular claim
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
