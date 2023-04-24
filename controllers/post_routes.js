const router = require("express").Router();
const { Comment, Post } = require("../models");

router.get('/posts/new', (req, res) => {
    res.render("private/post-new.hbs")
  });

router.post('/posts/new', (req, res) => {
  let post = Post.create({
    caption: req.body.caption,
    url: req.body.url,
  })
  res.render("private/dashboard")
})

// router.get('/dashboard', async (req, res) => {
//   Post.findOne({where: {id: id}})
//   .then(record => {
//     const result = record.get({plain: true});
//   })
//   });

  router.get("/dashboard/posts/:id", (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Post,
          attributes: ["id", "caption", "url", "createdAt", "updatedAt"],
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
        res.render("edit-post", { post, loggedIn: true });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });

module.exports = router;

