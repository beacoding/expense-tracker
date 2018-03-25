var ClaimItem = require('../models/ClaimItem');
var multer  = require('multer')
var upload = multer({ dest: './uploads/' })

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
  let items;
  try {
    req.body.image_url = req.body.receipt ? req.body.receipt : null;
    items = await ClaimItem.addOne(req.body);
    var claim_item_id = items.insertId;
    var item = await ClaimItem.findOne(claim_item_id);
    req.item = item;
    next()
  } catch (err) {
    req.error = err;
    next();
  }
}

const updateOne = async (req,res,next) => {
  try {
    req.body.image_url = req.body.receipt ? req.body.receipt : null;
    await ClaimItem.updateOne(req.body.item, req.body.id);
    var item = await ClaimItem.findOne(req.body.id);
    req.item = item;
    next()
  } catch (err) {
    req.error = err;
    next();
  }
}

const updateReceipt = async (req, res, next) => {
  try {
    req.body.image_url = req.body.receipt ? req.body.receipt : null;
    await ClaimItem.updateReceipt(req.body, req.body.id);
    var item = await ClaimItem.findOne(req.body.id);
    req.item = item;
    next()
  } catch (err) {
    req.error = err;
    next();
  }

}

const deleteOne = async (req, res, next) => {
  try {
    await ClaimItem.deleteOne(req.body.claim_item_id);
    next()
  } catch (err) {
    req.error = err;
    next();
  }
}

module.exports = {
  findAllWithClaim: findAllWithClaim,
  addNewItem: addNewItem,
  deleteOne: deleteOne,
  updateOne: updateOne,
  updateReceipt: updateReceipt
}