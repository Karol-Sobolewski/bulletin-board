const express = require('express');
const router = express.Router();
const sanitize = require('mongo-sanitize');

const Post = require('../models/post.model');

router.get('/posts', async (req, res) => {
  try {
    const result = await Post
      .find()
      .select('author created status title description editDate editAuthor')
      .sort({created: -1});
    if(!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.get('/posts/:id', async (req, res) => {
  try {
    const result = await Post
      .findById(req.params.id);
      // .select('author created title description editDate editAuthor');

    // console.log(`result`, result);
    if(!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.post('/posts', async (req, res) => {
  // console.log('req body', req.body);
  // const bodySanitize = sanitize(req.body);
  // console.log('bodySanitize', bodySanitize);
  try {
    const newPost = new Post(
      {
        title: req.body.title,
        status: req.body.status,
        description:  req.body.description,
        created: req.body.created,
        email: req.body.email,
        author: req.body.user,
      }
    );
    console.log(newPost);
    await newPost.save();
    res.json({ message: 'OK' });

  } catch(err) {
    res.status(500).json(err);
  }
});


router.put('/posts/:id', async (req, res) => {
  console.log(req.params);
  try {
    const post = await Post.findById(req.params.id);
    if (post) {
      for (const prop in req.body) {
        post[prop] = req.body[prop];
      }
      await post.save();
      res.json({ message: 'OK' });
    } else res.status(404).json({ message: 'Not found...' });
  } catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;
