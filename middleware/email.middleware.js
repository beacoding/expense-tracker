var Email = require('../models/Email');

const findEmail = async (req,res,next) => {
  let claimee_email;
  let approver_email;
  try {
    const { claimee_id, approver_id } = req.body;
    claimee_email = await Email.findEmail(claimee_id);
    approver_email = await Email.findEmail(approver_id);
    req.claimee_email = claimee_email;
    req.approver_email = approver_email;
    next()
  } catch (err) {
    req.error = err;
    next();
  }
}

module.exports = {
  findEmail: findEmail
};