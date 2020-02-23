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

// When user clicks "Like" on the front-end, he is added to the array

// @route   PUT api/posts/like/:id
// @desc    Like a post. PUT request, because we will be updating "post". "id" - is an ID of a post, that is being liked.
// @access  Private
router.put('/like/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if this post has already been liked by this user
    // "filter(...)" returns item if there is a match... If length > 0, it means that post already been liked by this user
    if (
      post.likes.filter(
        iterationUser => iterationUser.user.toString() === req.user.id
      ).length > 0
    ) {
      return res.status(400).json({ msg: 'Post already liked' });
    }

    // If post is not liked yet ("unshift()" adds item to the beginning of array)
    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/posts/unlike/:id
// @desc    Unlike a post.
// @access  Private
router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (
      post.likes.filter(
        iterationUser => iterationUser.user.toString() === req.user.id
      ).length === 0
    ) {
      return res.status(400).json({ msg: 'Post has not yet been liked' });
    }

    // Get remove index
    const removeIndex = post.likes
      .map(like => like.user.toString())
      .indexOf(req.user.id);
    // Remove from array
    post.likes.splice(removeIndex, 1);

    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/posts/comment/:id (post ID)
// @desc    Comment on a post
// @access  Private
router.post(
  '/comment/:id',
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
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const post = await Post.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      };

      post.comments.unshift(newComment);

      await post.save();
      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   DELETE api/posts/comment/:post_id/:comment_id
// @desc    Delete comment
// @access  Private
router.delete('/comment/:post_id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    // Finding the comment (will return either comment or "false")
    const comment = post.comments.find(
      comment => comment.id === req.params.comment_id
    );

    // IF comment doesn't exist
    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist' });
    }

    // Checking User's ownership
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    // Get remove index
    const removeIndex = post.comments
      .map(comment => comment.user.toString())
      .indexOf(req.user.id);
    // Remove from array
    post.comments.splice(removeIndex, 1);

    await post.save();
    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// TODO: Update comment

module.exports = router;
