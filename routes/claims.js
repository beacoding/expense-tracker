var express = require('express');
var router = express.Router();
var Claim = require('../models/Claim')

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
