var Employee = require('../models/Employee');

const findAll = async (req,res,next) => {
  let limits;
  try {
    employees = await Employee.findAll();
    req.employees = employees;
    next()
  } catch (err) {
    console.log(err);
    req.error = err;
    next();
  }
}

const findAllWithManagerID = async (req,res,next) => {
  let employees;
  try {
    employees = await Employee.findAllWithManagerID(req.query.manager_id);
    console.log(employees);
    req.employees = employees;
    next()
  } catch (err) {
    req.error = err;
    next();
  }
}

module.exports = {
  findAll: findAll,
  findAllWithManagerID: findAllWithManagerID
}