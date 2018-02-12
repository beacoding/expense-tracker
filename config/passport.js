// config/passport.js

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');
var connection = require('./connect');

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        connection.query("SELECT * FROM employee WHERE id = ? ",[id], function(err, rows){
            done(err, rows[0]);
        });
    });

    passport.use(
        'local-login',
        new LocalStrategy({
            // by default, local strategy uses email and password, we will override with email
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) { // callback with email and password from our form
           connection.query("SELECT * FROM employee WHERE email = ?", [email], function(err, rows){
                if (err)
                    return done(err);
                if (!rows.length) {
                    return done(null, false, req.flash('loginMessage', 'User does not exist.')); // req.flash is the way to set flashdata using connect-flash
                }
                if (password != rows[0].password) {
                  return done(null, false, req.flash('loginMessage', 'Incorrect password. Please try again.'))
                }

                delete rows[0]["password"];

                return done(null, rows[0]);
            });
        })
    );
};
