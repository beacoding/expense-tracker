// config/passport.js

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;

var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var dbconfig = require('./database');
var connection = mysql.createConnection(dbconfig.connection);

connection.query('USE ' + dbconfig.database);

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
                    return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
                }
                if (password != rows[0].password) {
                  return done(null, false, req.flash('loginMessage', 'Oops! wrong password'))
                }

                delete rows[0]["password"];
                console.log(rows[0])

                return done(null, rows[0]);
            });
        })
    );
};
