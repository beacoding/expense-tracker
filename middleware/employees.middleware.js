var Employee = require('../models/Employee');

const findAll = async (req, res, next) => {
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

const findAllWithManagers = async (req, res, next) => {
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

const findAllWithManagerID = async (req, res, next) => {
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

const findAllWithParams = async (req, res, next) => {
  let employees;
  try {
    employees = await Employee.findAllWithParams(req.query);
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
    employee = await Employee.findOneWithPassword(req.body.id);
    if (req.body.old_password != employee[0].password) {
      req.error = "Current password does not match.";
      next();
    } else {
      password = await Employee.updatePassword(req.body);
      next();
    }
  } catch (err) {
    req.error = err;
    next();
  }
}

const resetPassword = async (req, res, next) => {
  try {
    let info = await Employee.updatePassword(req.body);
    next();
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

const addOne = async (req, res, next) => {
  let email_exist;
  let id_exist;
  let manager;
  try {
    email_exist = await Employee.findOne(req.body.email);
    id_exist = await Employee.findOne(req.body.id);
    manager = await Employee.findOne(req.body.manager_id);
    if (id_exist[0]) {
      req.error = "Error: ID Exists";
      next();
    }
    if (email_exist[0]) {
      req.error = "Error: Email Exists"
      next();
    }
    if (!manager[0].is_active) {
      req.error = "Error: Manager is Disabled"
      next();
    } else {
      let info = await Employee.addOne(req.body);
      let employees = await Employee.findAllWithManagers();
      req.employees = employees;
      next();
    }
  } catch (err) {
    req.error = err;
    next();
  }
}

const assignManager = async (req, res, next) => {
  try {
    const { employee_id, manager_id } = req.body;
    if (manager_id) {
      let manager = await Employee.findOne(manager_id);
      if (!manager[0].is_active) {
        req.error = "Error: Manager is Disabled"
        next();
      }
    }
    let info = await Employee.assignManagerById(employee_id, manager_id);
    let employees = await Employee.findAllWithManagers();
    req.employees = employees;
    next();
  } catch (err) {
    req.error = err;
    next();
  }
}

const toggleAdmin = async (req, res, next) => {
  try {
    const { employee_id} = req.body;
    let info = await Employee.toggleAdmin(employee_id);
    let employees = await Employee.findAllWithManagers();
    req.employees = employees;
    next()
  } catch (err) {
    req.error = err;
    next();
  }
}

const disableOne = async (req, res, next) => {
  try {
    const { employee_id, manager_id} = req.body;
    let transferInfo = await Employee.transferBetweenManagersById(employee_id, manager_id);
    let disableInfo = await Employee.disableOne(employee_id);
    let employees = await Employee.findAllWithManagers();
    req.employees = employees;
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
    let employees = await Employee.findAllWithManagers();
    req.employees = employees;
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
  resetPassword: resetPassword,
  addOne: addOne,
  enableOne: enableOne,
  disableOne: disableOne,
  toggleAdmin: toggleAdmin,
  assignManager: assignManager,
  findAllWithParams: findAllWithParams
}