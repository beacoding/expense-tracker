function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();

  res.redirect('/');
}

function isAdmin(req, res, next) {
  if (req.user.is_admin === 1) {
    return next();
  }

  res.redirect('/')
}

module.exports = {
  isLoggedIn: isLoggedIn,
  isAdmin: isAdmin
}