var express = require('express');
var router = express.Router();

router.get('/*', function(req, res) {
  if (req.isAuthenticated()) {
    if (req.user.is_admin === 1) {
      res.render('authenticated.ejs', {
        user : req.user
      });
    }
  } else {
    res.render('index.ejs', {title: "Homepage", message: req.flash('loginMessage') });
  }
});

module.exports = router;
