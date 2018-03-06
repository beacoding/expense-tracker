var express = require('express');
var router = express.Router();
var Policy = require('../models/Policy')
var policyMiddleware = require('../middleware/policy.middleware');
var authMiddleware = require('../middleware/auth.middleware');

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/all', [authMiddleware.isLoggedIn, policyMiddleware.findAll], function(req, res, next) {
  if (req.error != undefined) {
    res.status(500);
    res.send({error: req.error});
  } else {
    res.send({employee: req.user, policies: req.policies});
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
      user : req.user,
      claims: req.claims
    });
  } else {
    res.render('index.ejs', {title: "Homepage", message: req.flash('loginMessage') });
  }
});

module.exports = router;
