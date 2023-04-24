function isAuthenticated(req, res, next) {
  if (!req.session.user_id) return res.redirect('/sign_in');

  next();
}

module.exports = isAuthenticated;