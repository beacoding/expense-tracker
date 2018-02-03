var connection = require('../config/connect');

module.exports = {
  findOne: function(id) {
    return new Promise((resolve, reject) => {
      //TODO queryString to find one employee
    });
  },

  addOne: function(id) {
    return new Promise((resolve, reject) => {
      //TODO queryString to add one employee
    }); 
  },

  updateOne: function(id) {
    return new Promise((resolve, reject) => {
      //TODO queryString to update one employee
    }); 
  },

  deleteOne: function(id) {
    return new Promise((resolve, reject) => {
      //TODO queryString to delete one employee
    }); 
  }
}
