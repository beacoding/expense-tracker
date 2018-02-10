var express = require('express');
var router = express.Router();
var Claim = require('../models/Claim');
var authMiddleware = require('../middleware/auth.middleware');
var claimsMiddleware = require('../middleware/claims.middleware');

router.get('/', [authMiddleware.isLoggedIn, claimsMiddleware.findAllWithEmployee], function(req, res, next) {
  if (req.error != undefined) {
    res.status(500);
    res.send({error: req.error});
  } else {
    res.send({employee: req.user, claims: req.claims});
  }
});

router.get('/pending_approvals', [authMiddleware.isLoggedIn, claimsMiddleware.findPendingApprovalsByManager], function(req, res, next) {
  if (req.error != undefined) {
    res.status(500);
    res.send({error: req.error});
  } else {
    res.send({employee: req.user, claims: req.claims});
  }
});

/*
router.post('/add_claim', [authMiddleware.isLoggedIn, claimsMiddleware.addOne], function(req, res, next) {
  if (req.error != undefined) {
    res.status(500);
    res.send({error: req.error});
  } else {
    res.send({employee: req.user, claims: req.claims});
  }
});
*/
router.get('/*', function(req, res) {
  if (req.isAuthenticated()) {
    res.render('authenticated.ejs', {
      user : req.user,
      claims: req.claims
    });
  } else {
    res.render('index.ejs', {title: "Homepage", message: req.flash('loginMessage') });
  }
});

// router.get('/add', [authMiddleware.isLoggedIn, claimsMiddleware.addOne], function(req, res, next) {
//   //TODO add one new claim
//   res.status(201);
// });

// router.get('/update', [authMiddleware.isLoggedIn, claimsMiddleware.updateOne], function(req, res, next) {
//   //TODO update claim
// });

// router.get('/delete', [authMiddleware.isLoggedIn, claimsMiddleware.deleteOne], function(req, res, next) {
//   //TODO delete claim
// });

module.exports = router;
