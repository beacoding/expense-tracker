var Policy = require('../models/Policy');

const findAll = async (req,res,next) => {
  let policies;
  try {
    policies = await Policy.findAll();
    req.policies = policies;
    next()
  } catch (err) {
    req.error = err;
    next();
  }
}

const findCompanies = async (req,res,next) => {
  let companies;
  try {
    companies = await Policy.findCompanies();
    req.companies = companies;
    next()
  } catch (err) {
    req.error = err;
    next();
  }
}

const findExpenseTypes = async (req,res,next) => {
  let expense_types;
  try {
    expense_types = await Policy.findExpenseTypes();
    req.expense_types = expense_types;
    next()
  } catch (err) {
    req.error = err;
    next();
  }
}

const updateOne = async (req, res, next) => {
  const name = req.body.name
  const value = req.body.value
  try {
    await Policy.updateOne(name, value);
    next()
  } catch(err) {
    req.error = err;
    next()
  }
}

module.exports = {
  findAll: findAll,
  findCompanies: findCompanies,
  findExpenseTypes: findExpenseTypes,
  updateOne: updateOne
}