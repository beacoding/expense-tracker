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

const findAllWithManagers = async (req,res,next) => {
  let limits;
  try {
    employees = await Employee.findAllWithManagers();
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
  let password;
  try {
    console.log(req.body);
    console.log(req.body.old_password);
    if(req.body.old_password != req.body.employeepass){
      req.error = "password error";
      console.log(req.error);
      next()
    }
    else{
    password = await Employee.updatePassword(req.body);
    req.password = password;
    next()
    }
  } catch (err) {
    req.error = err;
    next();
  }
}

const findOne = async (req, res, next) => {
  let employee;
  try {
    employee = await Employee.findOne(req.query.employee_id);
    req.employee = employee;
    next()
  } catch (err) {
    req.error = err;
    next();
  }
}

const disableOne = async (req, res, next) => {
  try {
    const { employee_id, manager_id} = req.body;
    let info = await Employee.disableOne(employee_id);
    await Employee.transferEmployeesToManagerWithManagerID(employee_id, manager_id);
    next()
  } catch (err) {
    req.error = err;
    next();
  }
}

const enableOne = async (req, res, next) => {
  try {
    const { employee_id } = req.body;
    let info = await Employee.enableOne(employee_id);
    next()
  } catch (err) {
    req.error = err;
    next();
  }
}

module.exports = {
  findAll: findAll,
  findAllWithManagers: findAllWithManagers,
  findOne: findOne,
  findAllWithManagerID: findAllWithManagerID,
  updatePassword: updatePassword,
  enableOne: enableOne,
  disableOne: disableOne
}