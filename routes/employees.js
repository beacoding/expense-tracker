var express = require('express');
var router = express.Router();
var Employee = require('../models/Employee')
var employeesMiddleware = require('../middleware/employees.middleware');
var authMiddleware = require('../middleware/auth.middleware');

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/all', [authMiddleware.isLoggedIn, employeesMiddleware.findAll], function(req, res, next) {
  if (req.error != undefined) {
    res.status(500);
    res.send({error: req.error});
  } else {
    res.send({employee: req.user, employees: req.employees});
  }
});

router.get('/with', [authMiddleware.isLoggedIn, employeesMiddleware.findAllWithManagerID], function(req, res, next) {
  if (req.error != undefined) {
    res.status(500);
    res.send({error: req.error});
  } else {
    res.send({employee: req.user, employees: req.employees});
  }
});

router.post('/update_password', [authMiddleware.isLoggedIn, employeesMiddleware.updatePassword], function(req, res, next) {
  console.log("reached here");
  console.log(req);
  console.log(req.error);
  if (req.error != undefined) {
    res.status(500);
    res.send({error: req.error});
  } else {
    console.log(res);
    console.log(req.password);
    res.send({password: req.password});
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
