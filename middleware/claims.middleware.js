var Claim = require('../models/Claim');

const findAllWithEmployee = async (req,res,next) => {
  let claims;
  try {
    claims = await Claim.findAllWithEmployee(req.user);
    req.claims = claims;
    next()
  } catch (err) {
    req.error = err;
    next();
  }
}

const findPendingApprovalsByManager = async (req,res,next) => {
  let claims;
  try {
    claims = await Claim.findPendingApprovalsByManager(req.user);
    req.claims = claims;
    next()
  } catch (err) {
    req.error = err;
    next();
  }
}

const addOne = async (req,res,next) => {
  let claims;
  try {
    claims = await Claim.addOne(req.claim);
    req.claims = claims;
    next()
  } catch (err) {
    req.error = err;
    next();
  }
}

module.exports = {
  findAllWithEmployee: findAllWithEmployee,
  findPendingApprovalsByManager: findPendingApprovalsByManager
}