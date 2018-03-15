var express = require('express');
var multer  = require('multer')
var router = express.Router();
var crypto = require('crypto');
var path = require('path');
var storage = multer.diskStorage({
  destination: 'public/uploads/',
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err) return cb(err)
      cb(null, raw.toString('hex') + path.extname(file.originalname))
    })
  }
})
var upload = multer({ storage: storage }).any()
var ClaimItem = require('../models/ClaimItem')
var authMiddleware = require('../middleware/auth.middleware');
var claimItemsMiddleware = require('../middleware/claimItems.middleware');

router.get('/', [authMiddleware.isLoggedIn, claimItemsMiddleware.findAllWithClaim], function(req, res, next) {
  if (req.error !== undefined) {
    res.status(500);
    res.send({error: req.error});
  }
  res.send({employee: req.user, claimItems: req.claimItems});
});

router.post('/add_item', authMiddleware.isLoggedIn, upload, claimItemsMiddleware.addNewItem, function(req, res, next) {
  if (req.error !== undefined) {
    res.status(500);
    res.send({error: req.error});
  } else {
    res.send({claimItem: req.item});
  }
});

router.post('/edit_item', authMiddleware.isLoggedIn, upload, claimItemsMiddleware.updateOne, function(req, res, next) {
  if (req.error !== undefined) {
    res.status(500);
    res.send({error: req.error});
  } else {
    res.send({claimItem: req.item})
  }
});


router.post('/delete_item', [authMiddleware.isLoggedIn, claimItemsMiddleware.deleteOne], function(req, res, next) {
  if (req.error != undefined) {
    res.status(500);
    res.send({error: req.error});
  } else {
    res.send({});
  }
});


router.get('/*', function(req, res) {
  if (req.isAuthenticated()) {
    res.render('authenticated.ejs', {
      user : req.user
    });
  } else {
    res.render('index.ejs', {title: "Homepage", message: req.flash('loginMessage')});
  }
});

module.exports = router;
