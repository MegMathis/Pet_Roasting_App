const router = require("express").Router();
const { User } = require("../models");

// log user in
router.post("/auth/sign_in", async (req, res) => {
  const user_data = req.body;

  const user = await User.findOne({
    where: {
      email: user_data.email
    },
  });
  if (!user) {
    req.session.auth_errors = [
      'Account not found with that email.  Please Sign Up',
    ];
    return res.redirect("/sign_up");
  }

  const valid_pass = await user.validatePass(user_data.password);

  if (!valid_pass) {
    req.session.auth_errors = ["Password is incorrect.  Please try again"];
    return res.redirect("/sign_in");
  }

  req.session.user_id = user.id;
  delete req.session.auth_errors;
  //   check to see where we want to redirect user
  res.redirect("/dashboard");
});

//get route for dashboard
router.get("/dashboard", async (req, res) => {
  if (!req.session.user_id){
    return res.redirect("/sign_in")
  }
  const user = await User.findByPk(req.session.user_id)
  res.render("private/dashboard", {
    email: user.email
  })
})

// register user
router.post("/auth/sign_up", async (req, res) => {
  const user_data = req.body;

  delete req.session.auth_errors;

  try {
    const user = await User.create(user_data);

    req.session.user_id = user.id;
    delete req.session.auth_errors;

    // check to see where we want to redirect user
    res.redirect("/dashboard");
  } catch (err) {
    const errors = err.errors.map(errObj => errObj.message);

    req.session.auth_errors = errors;
    console.log(err)
    res.redirect('/sign_up')


  }
});

router.get("/auth/logout", (req, res) => {
  req.session.destroy();

  res.redirect("/");
});

module.exports = router;
