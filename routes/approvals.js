var express = require('express');
var router = express.Router();

router.get('/*', function(req, res) {
  if (req.isAuthenticated()) {
    res.render('authenticated.ejs', {
      user : req.user,
      claims: req.claims
    });
  } else {
    res.render('index.ejs', {title: "Homagepage", message: req.flash('loginMessage') });
  }
});

module.exports = router;