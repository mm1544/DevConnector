// Adding posts, likes, comments

const express = require('express');
// Need Express router to have routes in separate files.
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Post = require('../../models/Post');
const User = require('../../models/User');
const Profile = require('../../models/Profile');

// @route   POST api/posts
// @desc    Create a post
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('text', 'Text is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    // "!errors.isEmpty()" - allegedly, the documentation says to do it this way
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Since user is logged-in, he has a Token which contains user.id
      // "select('-password')" - Because we don't want to send Password back...
      const user = await User.findById(req.user.id).select('-password');

      // Instantiating new Post from the model and passing valuses
      const newPost = new Post({
        // "text" is coming from the "body" - submitted data
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        // user ID
        user: req.user.id
      });

      const post = await newPost.save();
      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET api/posts
// @desc    Get all posts
// @access  Private (posts are NOT public, although profiles are)
router.get('/', auth, async (req, res) => {
  try {
    // "sort({date: -1})" - will rturn recent first
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/posts/:id
// @desc    Get post by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.json(post);
  } catch (err) {
    console.error(err.message);
    // If not a formated object-Id was passes and therefore no post will be found
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/posts/:id
// @desc    Delete a post
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Need to make sure that the user that is deleteting the post is the one that owns it
    // "req.user.id" is a string; "post.user" is a object id - a number
    if (post.user.toString() !== req.user.id) {
      // "401" - not authorised
      return res.status(401).json({ msg: 'User is not authorized' });
    }

    // If post doesn't exist
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    await post.remove();
    res.json({ msg: 'Post Removed' });
  } catch (err) {
    console.error(err.message);
    // If not a formated object-Id was passes and therefore no post will be found
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
