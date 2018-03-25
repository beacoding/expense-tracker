var express = require('express');
var reactdomserver = require('react-dom/server');

module.exports = function(app, passport) {
  app.get('/', function(req, res) {
    if (req.isAuthenticated()) {
      res.redirect('/claims');
    } else {
      res.render('index.ejs', {title: "Homepage", message: req.flash('loginMessage') });
    }
  });

  app.get('/claims', function(req, res) {
    if (req.isAuthenticated()) {
      res.render('authenticated.ejs', {
        user : req.user,
        claims: req.claims
      });
    } else {
      res.render('index.ejs', {title: "Homepage", message: req.flash('loginMessage') });
    }
  });

  app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/',
            failureRedirect : '/',
            failureFlash : true
    }),
        function(req, res) {
            if (req.body.remember) {
              req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
              req.session.cookie.expires = false;
            }
        res.redirect('/');
    });

  app.get('/logout', function(req, res) {
    req.session.destroy(() => {
      res.clearCookie('connect.sid');
      res.redirect('/');
    });
  });

  // CATCH PAGE REFRESHES FROM ADMIN PAGES
  app.get('/admin/*', function(req, res) {
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

  // CATCH PAGE REFRESHES FROM PROFILE PAGE
  app.get('/profile', function(req, res) {
    if (req.isAuthenticated()) {
      res.render('authenticated.ejs', {
        user : req.user
      });
    } else {
      res.render('index.ejs', {title: "Homepage", message: req.flash('loginMessage') });
    }
  });
};
