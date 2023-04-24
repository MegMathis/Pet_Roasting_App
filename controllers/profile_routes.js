const router = require("express").Router();
const { User, Profile } = request("../models");

router.get("/profile", async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userProfile = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Profile }],
    });

    const user = userProfile.get({ plain: true });

    res.render("profile", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
