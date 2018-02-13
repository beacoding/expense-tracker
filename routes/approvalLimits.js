var express = require('express');
var router = express.Router();
var EmployeeCostCentre = require('../models/EmployeeCostCentre')
var authMiddleware = require('../middleware/auth.middleware');
var approvalLimitsMiddleware = require('../middleware/approvalLimits.middleware');

router.get('/all', [authMiddleware.isLoggedIn, approvalLimitsMiddleware.findAll], function(req, res, next) {
  if (req.error != undefined) {
    res.status(500);
    res.send({error: req.error});
  } else {
    res.send({ limits: req.limits });
  }
});

router.get('/current_user', [authMiddleware.isLoggedIn, approvalLimitsMiddleware.findAllByEmployee], function(req, res, next) {
  if (req.error != undefined) {
    res.status(500);
    res.send({error: req.error});
  } else {
    res.send({ limits: req.limits });
  }
});

router.post('/has_authority', [authMiddleware.isLoggedIn, approvalLimitsMiddleware.findEligible], function(req, res, next) {
  if (req.error != undefined) {
    res.status(500);
    res.send({error: req.error});
  } else {
    res.send({ limits: req.limits });
  }
});

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

module.exports = router;
