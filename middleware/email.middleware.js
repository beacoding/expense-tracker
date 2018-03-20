var Employee = require('../models/Employee');

const findApproverUser = async (req,res,next) => {
  let approver;
  try {
    const { new_approver_id } = req.body;
    approver = await Employee.findOne(new_approver_id);
    req.approver = approver[0];
    next()
  } catch (err) {
    req.error = err;
    next();
  }
}

module.exports = {
  findApproverUser: findApproverUser
};