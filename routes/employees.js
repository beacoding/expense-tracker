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

router.post('/create', [authMiddleware.isLoggedIn, authMiddleware.isAdmin, employeesMiddleware.addOne], function(req, res, next) {
  if (req.error == "Error: ID Exists" || req.error == "Error: Email Exists" || req.error == "Error: Manager is Disabled") {
    res.status(403);
    res.send({error: req.error})
  } else if (req.error != undefined) {
    res.status(500);
    res.send({error: req.error});
  } else {
    res.send({employees: req.employees});
  }
});

router.post('/disable_employee', [authMiddleware.isLoggedIn, authMiddleware.isAdmin, employeesMiddleware.disableOne], function(req, res, next) {
  if (req.error != undefined) {
    res.status(500);
    res.send({error: req.error});
  } else {
    res.send({employees: req.employees});
  }
});

router.post('/enable_employee', [authMiddleware.isLoggedIn, authMiddleware.isAdmin, employeesMiddleware.enableOne], function(req, res, next) {
  if (req.error != undefined) {
    res.status(500);
    res.send({error: req.error});
  } else {
    res.send({employees: req.employees});
  }
});

router.post('/assign_manager', [authMiddleware.isLoggedIn, authMiddleware.isAdmin, employeesMiddleware.assignManager], function(req, res, next) {
  if (req.error == "Error: Manager is Disabled") {
    res.status(403);
    res.send({error: req.error});
  } else if (req.error != undefined) {
    res.status(500);
    res.send({error: req.error});
  } else {
    res.send({employees: req.employees});
  }
});

router.post('/toggle_admin', [authMiddleware.isLoggedIn, authMiddleware.isAdmin, employeesMiddleware.toggleAdmin], function(req, res, next) {
  if (req.error != undefined) {
    res.status(500);
    res.send({error: req.error});
  } else {
    res.send({employees: req.employees});
  }
});

router.post('/update_password', [authMiddleware.isLoggedIn, employeesMiddleware.updatePassword], function(req, res, next) {
  if (req.error == "Current password does not match.") {
    res.status(403);
    res.send({error: req.error});
  } else if (req.error != undefined) {
    res.status(500);
    res.send({error: req.error});
  } else {
    res.send({});
  }
});

router.post('/reset_password', [authMiddleware.isLoggedIn, authMiddleware.isAdmin, employeesMiddleware.resetPassword], function(req, res, next) {
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
