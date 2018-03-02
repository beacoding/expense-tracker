var EmployeeCostCentre = require('../models/EmployeeCostCentre');

const findAll = async (req,res,next) => {
  let limits;
  try {
    limits = await EmployeeCostCentre.findAll();
    req.limits = limits;
    next()
  } catch (err) {
    req.error = err;
    next();
  }
}

const findAllByEmployee = async (req,res,next) => {
  let limits;
  try {
    limits = await EmployeeCostCentre.findAllByEmployee(req.user);
    req.limits = limits;
    next()
  } catch (err) {
    req.error = err;
    next();
  }
}

const findAllWithParams = async (req,res,next) => {
  let limits;
  try {
    limits = await EmployeeCostCentre.findAllWithParams(req.query);
    req.limits = limits;
    next()
  } catch (err) {
    req.error = err;
    next();
  }
}


const findEligible = async (req,res,next) => {
  let limits;
  try {
    limits = await EmployeeCostCentre.findForwardManagers(req.body.cost_centre_id);
    req.limits = limits;
    next()
  } catch (err) {
    req.error = err;
    next();
  }
}

const updateOne = async (req,res,next) => {
  let limit;
  try {
    limit = await EmployeeCostCentre.updateOne(req.body);
    req.limit = limit;
    next()
  } catch (err) {
    req.error = err;
    next();
  }
}

const addOne = async (req,res,next) => {
  let limit;
  try {
    limit = await EmployeeCostCentre.addOne(req.body);
    req.limit = limit;
    next()
  } catch (err) {
    req.error = err;
    next();
  }
}

module.exports = {
  findAll: findAll,
  findAllByEmployee: findAllByEmployee,
  findEligible: findEligible,
  addOne: addOne,
  updateOne: updateOne,
  findAllWithParams: findAllWithParams
}