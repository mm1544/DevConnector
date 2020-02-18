// Adding posts, like, comment

const express = require('express');
// Need Express router to have routes in separate files.
const router = express.Router();

// @route   GET api/posts
// @desc    Test route
// @access  Public
router.get('/', (req, res) => res.send('Posts route'));

module.exports = router;
