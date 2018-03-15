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
  // add item locally

  try {
    req.body['image_url'] = req.files[0] ? req.files[0]["filename"] : null;
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
  let items;
  // add item locally

  try {
    if (req.body.image_url) {
      req.body['image_url'] = req.files[0] ? req.files[0]["filename"] : null;
    }
    items = await ClaimItem.updateOne(req.body.item, req.body.i);
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
  updateOne: updateOne
}