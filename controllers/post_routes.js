const router = require("express").Router();
const { Comment, Post } = require("../models");
const isAuthenticated = require('./helpers/isAuthenticated');

router.get('/posts/new', isAuthenticated, (req, res) => {
  res.render("private/post-new");
});

router.post('/posts/new', async (req, res) => {
  await Post.create({
    // Attach the associated user throught the userId foreignKey
    // This is key is created through the User.hasMany(Post) association method in models/index.js
    userId: req.session.user_id,
    caption: req.body.caption,
    url: req.body.url,
  });

  // We redirect to the dashboard page instead of rendering,
  // because that route will load all posts and show them
  res.redirect('/dashboard');
});

router.get("/dashboard/posts/:id", isAuthenticated, (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Comment,
        // attributes: ["id", "caption", "url", "createdAt", "updatedAt"],
        // include: {
        //   // model: User,
        //   // attributes: ["username"],
        // },
      },
      // {
      //   model: User,
      //   attributes: ["username"],
      // },
    ],
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      //   serialize data
      const post = dbPostData.get({ plain: true });

      //   pass data to template with session variable
      res.render("private/edit-post", { post, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;

