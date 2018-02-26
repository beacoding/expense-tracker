var express = require('express');
var session  = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var flash    = require('connect-flash');
const fileUpload = require('express-fileupload');

var index = require('./routes/index');
var employees = require('./routes/employees');
var claims = require('./routes/claims');
var claimItems = require('./routes/claimItems');
var approvalLimits = require('./routes/approvalLimits');
var multer  = require('multer')
var upload = multer({ dest: './uploads/' })

var app = express();

// disable client-side caching (because IE...)
var nocache = require('nocache')
app.use(nocache())

// passport
require('./config/passport')(passport); // pass passport for configuration

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


// required for passport
app.use(session({
  secret: 'sessionsecret',
  resave: true,
  saveUninitialized: true
 } )); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

app.use(express.static(path.join(__dirname, 'public')));
app.use(flash()); // use connect-flash for flash messages stored in session

require('./routes/index.js')(app, passport)
app.use('/employees', employees);
app.use('/claims', claims)
app.use('/claim_items', claimItems);
app.use('/approval_limits', approvalLimits);
app.use('/approvals', claims);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
