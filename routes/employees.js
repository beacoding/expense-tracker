var express = require('express');
var router = express.Router();
var Employee = require('../models/Employee')
var employeesMiddleware = require('../middleware/employees.middleware');
var authMiddleware = require('../middleware/auth.middleware');

router.get('/all', [authMiddleware.isLoggedIn, employeesMiddleware.findAll], function(req, res, next) {
  if (req.error != undefined) {
    res.status(500);
    res.send({error: req.error});
  } else {
    res.send({employee: req.user, employees: req.employees});
  }
});

router.get('/all_with_managers', [authMiddleware.isLoggedIn, employeesMiddleware.findAllWithManagers], function(req, res, next) {
  if (req.error != undefined) {
    res.status(500);
    res.send({error: req.error});
  } else {
    res.send({employee: req.user, employees: req.employees});
  }
});

router.get('/with_manager', [authMiddleware.isLoggedIn, employeesMiddleware.findAllWithManagerID], function(req, res, next) {
  if (req.error != undefined) {
    res.status(500);
    res.send({error: req.error});
  } else {
    res.send({employee: req.user, employees: req.employees});
  }
});

router.get('/with', [authMiddleware.isLoggedIn, employeesMiddleware.findAllWithParams], function(req, res, next) {
  if (req.error != undefined) {
    res.status(500);
    res.send({error: req.error});
  } else {
    res.send({employee: req.user, employees: req.employees});
  }
});

router.get('/with_employee', [authMiddleware.isLoggedIn, employeesMiddleware.findOne], function(req, res, next) {
  if (req.error != undefined) {
    res.status(500);
    res.send({error: req.error});
  } else {
    res.send({ employee: req.employee});
  }
});

router.post('/create', [authMiddleware.isLoggedIn, employeesMiddleware.addOne], function(req, res, next) {
  if (req.error != undefined) {
    res.status(500);
    res.send({error: req.error});
  } else {
    res.send({employees: req.employees});
  }
});

router.post('/disable_employee', [authMiddleware.isLoggedIn, employeesMiddleware.disableOne], function(req, res, next) {
  if (req.error != undefined) {
    res.status(500);
    res.send({error: req.error});
  } else {
    res.send({});
  }
});

router.post('/enable_employee', [authMiddleware.isLoggedIn, employeesMiddleware.enableOne], function(req, res, next) {
  if (req.error != undefined) {
    res.status(500);
    res.send({error: req.error});
  } else {
    res.send({});
  }
});

router.post('/update_password', [authMiddleware.isLoggedIn, employeesMiddleware.updatePassword], function(req, res, next) {
  if(req.error == "password error"){
    res.status(403);
    res.send({error: req.error});
  }
  else if (req.error != undefined) {
    res.status(500);
    res.send({error: req.error});
  } else {
    res.send({password: req.password});
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
