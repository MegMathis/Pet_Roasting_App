const router = require('express').Router();
const { Post, Profile, User } = require('../models');

// Route to GET one post
router.get('/posts/:post_id', async (req, res) => {
  const post_id = req.params.post_id;

  const post = await Post.findByPk(post_id);

  if (post) {
    res.send(post);
  } else res.send('No posts found with that id.');
});

// Route to GET all posts
// GET http://localhost:3000/api/posts
router.get('/posts', async (req, res) => {
  const posts = await Post.findAll();

  res.send(posts);
});

// Route to CREATE a posts
// POST http://localhost:3000/api/posts
router.post('/posts', async (req, res) => {
  const postData = req.body;

  const newPost = await Post.create(postData);

  res.send(newPost);
});

// Route to GET one user
router.get('/users/:user_id', async (req, res) => {
  const user_id = req.params.user_id;
  const include_posts = req.query.include_posts;

  if (include_posts) {
    const user = await User.findOne({
      include: Post,
      where: {
        id: user_id
      }
    });

    return res.send(user);
  }

  const user = await User.findByPk(user_id);

  if (user) {
    res.send(user);
  } else res.send('No users found by that id.');
});

// Route to GET all users
router.get('/users', async (req, res) => {
  const users = await User.findAll();

  res.send(users);
});

// Route to Add post to a user
router.post('/users/add/:user_id', async (req, res) => {
  const user_id = req.params.user_id;
  const post_id = req.query.post_id;

  const user = await User.findByPk(user_id);
  const post = await Post.findByPk(post_id);

  await user.addPost(post);

  res.send('Post added successfully!');
});

// Route to CREATE a User
router.post('/users', async (req, res) => {
  const userData = req.body;

  const newUser = await User.create(userData);

  res.send(newUser);
});

module.exports = router;