const router = require("express").Router();
const { Comment, Post } = require("../models");

router.get('/posts/new', (req, res) => {
    res.render("private/post-new.hbs")
  });

router.post('/posts/new', (req, res) => {
  const post = Post.create({
    caption: req.body.caption,
    url: req.body.url,
  })
  res.render("private/dashboard")
})

router.get('/dashboard', async (req, res) => {
  const post = await Post.findAll();
  res.render("/private/dashboard", {
    caption: post.caption,
    url: post.url
  })
});

module.exports = router;

