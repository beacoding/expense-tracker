var Employee = require('../models/Employee');

const findAll = async (req,res,next) => {
  let limits;
  try {
    employees = await Employee.findAll();
    req.employees = employees;
    next()
  } catch (err) {
    req.error = err;
    next();
  }
}

const findAllWithManagerID = async (req,res,next) => {
  let employees;
  try {
    employees = await Employee.findAllWithManagerID(req.query.manager_id);
    req.employees = employees;
    next()
  } catch (err) {
    req.error = err;
    next();
  }
}

const updatePassword = async (req, res, next) => {
  console.log("here!!", req.body);
  let password;
  try {
    const { id} = req.body;
    console.log("middleware");
    console.log(req.body);
    console.log(id);
    password = await Employee.updatePassword(id);
    req.password = password;
    next()
  } catch (err) {
    req.error = err;
    next();
  }
}

module.exports = {
  findAll: findAll,
  findAllWithManagerID: findAllWithManagerID,
  updatePassword: updatePassword
}