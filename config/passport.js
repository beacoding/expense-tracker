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
    connection.query(`SELECT u.id, u.first_name, u.last_name, u.email, u.password, u.manager_id, u.is_admin, u.is_active, CONCAT(m.first_name, ' ', m.last_name) as manager_name 
                        FROM employee u LEFT JOIN employee m ON m.id = u.manager_id
                        WHERE u.id = ?`, [id], function(err, rows){
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
      connection.query(`SELECT u.id, u.first_name, u.last_name, u.email, u.password, u.manager_id, u.is_admin, u.is_active, CONCAT(m.first_name, ' ', m.last_name) as manager_name 
                          FROM employee u LEFT JOIN employee m ON m.id = u.manager_id
                          WHERE u.email = ? AND u.is_active = 1`, [email], function(err, rows){
        if (err)
          return done(err);
        if (!rows.length) {
          return done(null, false, req.flash('loginMessage', 'User does not exist.')); // req.flash is the way to set flashdata using connect-flash
        }
        if (!bcrypt.compareSync(password, rows[0].password)) {
          return done(null, false, req.flash('loginMessage', 'Incorrect password. Please try again.')); // create the loginMessage and save it to session as flashdata
        }
        delete rows[0]["password"];
        return done(null, rows[0]);
      });
    })
  );
};
