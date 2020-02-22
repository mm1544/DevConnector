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

module.exports = router;
