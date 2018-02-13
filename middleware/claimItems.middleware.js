var ClaimItem = require('../models/ClaimItem');

const findAllWithClaim = async (req,res,next) => {
  let claimItems;
  try {
    claimItems = await ClaimItem.findAllWithClaim(parseInt(req.query.claim_id));
    req.claimItems = claimItems;
    next()
  } catch (err) {
    req.error = err;
    next();
  }
}

const addNewItem = async (req,res,next) => {
  console.log(req);
  let items;
  try {
    items = await ClaimItem.addOne(req.body);
    req.items = items;
    next()
  } catch (err) {
    req.error = err;
    next();
  }
}
module.exports = {
  findAllWithClaim: findAllWithClaim,
  addNewItem: addNewItem

}