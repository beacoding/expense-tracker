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

router.post('/update', [authMiddleware.isLoggedIn, approvalLimitsMiddleware.updateOne], function(req, res, next) {
  if (req.error != undefined) {
    res.status(500);
    res.send({error: req.error});
  } else {
    res.send({ limits: req.limits });
  }
});

router.get('/find_all_cost_centres', [authMiddleware.isLoggedIn, approvalLimitsMiddleware.findAllCostCentres], function(req, res, next) {
  if (req.error != undefined) {
    res.status(500);
    res.send({error: req.error});
  } else {
    res.send({ cost_centres: req.cost_centres });
  }
});

router.post('/add', [authMiddleware.isLoggedIn, approvalLimitsMiddleware.addOne], function(req, res, next) {
  if (req.error != undefined) {
    res.status(500);
    res.send({error: req.error});
  } else {
    res.send({ limits: req.limits });
  }
});

router.post('/revoke', [authMiddleware.isLoggedIn, approvalLimitsMiddleware.revokeOne], function(req, res, next) {
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

router.get('/with', [authMiddleware.isLoggedIn, approvalLimitsMiddleware.findAllWithParams], function(req, res, next) {
  if (req.error != undefined) {
    res.status(500);
    res.send({error: req.error});
  } else {
    res.send({employee: req.user, limits: req.limits});
  }
});

router.get('/*', function(req, res) {
  if (req.isAuthenticated()) {
    if (req.user.is_admin === 1) {
      res.render('authenticated.ejs', {
        user: req.user
      });
    }
  } else {
    res.render('index.ejs', {title: "Homepage", message: req.flash('loginMessage') });
  }
});

module.exports = router;
