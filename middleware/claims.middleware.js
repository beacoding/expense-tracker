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

const findAllWithParams = async (req,res,next) => {
  let claims;
  try {
    claims = await Claim.findAllWithParams(req.query, req.user);
    req.claims = claims;
    next()
  } catch (err) {
    req.error = err;
    next();
  }
}


const findOneWithClaimID = async (req,res,next) => {
  let claim;
  try {
    claim = await Claim.findOneWithClaimID(parseInt(req.query.claim_id));
    req.claim = claim[0];
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

const findProcessedApprovalsByManager = async (req,res,next) => {
  let claims;
  try {
    claims = await Claim.findProcessedApprovalsByManager(req.user);
    req.claims = claims;
    next()
  } catch (err) {
    req.error = err;
    next();
  }
}

const updateStatus = async (req,res,next) => {
  let claims;
  try {
    const { claim_id, approver_id, status, notes } = req.body
    claims = await Claim.updateStatus(claim_id, approver_id, status, notes);
    var claim = await Claim.findOneWithClaimID(claim_id);
    req.claim = claim[0];
    next()
  } catch (err) {
    req.error = err;
    next();
  }
}

const addOne = async (req,res,next) => {
  let claim;
  try {
    claim = await Claim.addOne(req.body);
    req.claim = claim;
    next()
  } catch (err) {
    req.error = err;
    next();
  }
}

const deleteOne = async (req, res, next) => {
  try {
    await Claim.deleteOne(req.body.claim_id);
    next()
  } catch (err) {
    req.error = err;
    next();
  }
}

const findMileageSoFarPerMonth = async (req, res, next) => {
  let cost;
  try {
    cost_entry = await Claim.findMileageSoFarPerMonth(req.user);
    req.cost = cost_entry.amount
    next();
  } catch (err) {
    req.error = err;
    next();
  }
}

module.exports = {
  findAllWithEmployee: findAllWithEmployee,
  findPendingApprovalsByManager: findPendingApprovalsByManager,
  findProcessedApprovalsByManager: findProcessedApprovalsByManager,
  findAllWithParams: findAllWithParams,
  addOne: addOne,
  updateStatus: updateStatus,
  findOneWithClaimID: findOneWithClaimID,
  deleteOne: deleteOne,
  findMileageSoFarPerMonth: findMileageSoFarPerMonth
}