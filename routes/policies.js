var express = require('express');
var router = express.Router();
var Policy = require('../models/Policy')
var policyMiddleware = require('../middleware/policy.middleware');
var authMiddleware = require('../middleware/auth.middleware');

router.get('/all', [authMiddleware.isLoggedIn, policyMiddleware.findAll], function(req, res, next) {
  if (req.error != undefined) {
    res.status(500);
    res.send({error: req.error});
  } else {
    res.send({employee: req.user, policies: req.policies});
  }
});

router.get('/companies', [authMiddleware.isLoggedIn, policyMiddleware.findCompanies], function(req, res, next) {
  if (req.error != undefined) {
    res.status(500);
    res.send({error: req.error});
  } else {
    res.send({employee: req.user, companies: req.companies});
  }
});

router.get('/expense_types', [authMiddleware.isLoggedIn, policyMiddleware.findExpenseTypes], function(req, res, next) {
  if (req.error != undefined) {
    res.status(500);
    res.send({error: req.error});
  } else {
    res.send({employee: req.user, expense_types: req.expense_types});
  }
});

router.post('/update', [authMiddleware.isLoggedIn, policyMiddleware.updateOne], function(req, res, next) {
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
    res.render('index.ejs', {title: "Homepage", message: req.flash('loginMessage') });
  }
});

module.exports = router;
