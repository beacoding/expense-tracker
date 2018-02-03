var express = require('express');
var router = express.Router();
var ClaimItem = require('../models/ClaimItem')

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
