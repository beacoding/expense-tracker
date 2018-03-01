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

const updateStatus = async (req,res,next) => {
  let claim;
  try {
    claim = await Claim.updateStatus(req.body.claim_id, req.body.approver_id, req.body.status);
    req.claim = claim;
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

module.exports = {
  findAllWithEmployee: findAllWithEmployee,
  findPendingApprovalsByManager: findPendingApprovalsByManager,
  findAllWithParams: findAllWithParams,
  addOne: addOne,
  updateStatus: updateStatus,
  findOneWithClaimID: findOneWithClaimID
}