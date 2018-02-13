var express = require('express');
var router = express.Router();
var Employee = require('../models/Employee')

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
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
