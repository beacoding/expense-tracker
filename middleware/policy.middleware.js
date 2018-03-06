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
  updateOne: updateOne
}