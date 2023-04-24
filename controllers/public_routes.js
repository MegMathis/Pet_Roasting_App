const router = require("express").Router();

// Renders Homepage View
router.get("/", async (req, res) => {
  if (req.session.user_id) return res.redirect("/dashboard");

  res.render("index");
});

// Redirects logged in user to dashboard
function isLoggedIn(req, res, next) {
  if (req.session?.user_id) return res.redirect("/dashboard");

  next();
};

// Renders Login Page View
router.get("/sign_in", isLoggedIn, (req, res) => {
  res.render("auth/sign_in", {
    auth_errors: req.session?.auth_errors,
  });
});

// Renders Sign Up Page View
router.get("/sign_up", isLoggedIn, (req, res) => {
  res.render("auth/sign_up", {
    auth_errors: req.session?.auth_errors,
  });
});

module.exports = router;
