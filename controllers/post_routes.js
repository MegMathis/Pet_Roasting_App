const router = require("express").Router();
// const { Comment } = require("../models");

router.get('/posts/new', (req, res) => {
    // res.render('private/post-new.handlebars');
    res.render("private/post-new.hbs")
  });

router.post('posts/new', (req, res) => {
  console.log(req.body);
})

module.exports = router;