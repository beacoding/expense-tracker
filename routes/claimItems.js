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

router.post('/add_item', [authMiddleware.isLoggedIn, claimItemsMiddleware.addNewItem], function(req, res, next) {
  if (req.error != undefined) {
    res.status(500);
    res.send({error: req.error});
  } else {
    res.send({claim: req.item});
  }
});

router.get('/*', function(req, res) {
  if (req.isAuthenticated()) {
    res.render('authenticated.ejs', {
      user : req.user,
      claims: req.claims
    });
  } else {
    res.render('index.ejs', {title: "Homepage", message: req.flash('loginMessage')});
  }
});

module.exports = router;
