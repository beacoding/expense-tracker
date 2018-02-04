var express = require('express');
var router = express.Router();
var ClaimItem = require('../models/ClaimItem')
var authMiddleware = require('../middleware/auth.middleware');
var claimItemsMiddleware = require('../middleware/claimItems.middleware');

router.get('/', [authMiddleware.isLoggedIn, claimItemsMiddleware.findAllWithClaim], function(req, res, next) {
  if (req.error != undefined) {
    res.status(500);
    res.send({error: req.error});
  }
  res.send({employee: req.user, claimItems: req.claimItems});
});

module.exports = router;
