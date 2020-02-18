// Fetching and updating profiles

const express = require('express');
// Need Express router to have routes in separate files.
const router = express.Router();

// @route   GET api/profile
// @desc    Test route
// @access  Public
router.get('/', (req, res) => res.send('Profile route'));

module.exports = router;
