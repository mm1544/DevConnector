// Fetching and updating profiles

const express = require('express');
// Need Express router to have routes in separate files.
const router = express.Router();
// Getting middleware to protect this route
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

// Getting Profile model
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route   GET api/profile/me (will get to my profile based on the id that it is in the header)
// @desc    Get current users profile
// @access  Private (because getting user profile by the ID which is in the token)
router.get('/me', auth, async (req, res) => {
  try {
    // "user" pertain to Profile model's "user" field which is going to  be "ObjectId" of the user.
    // "req.user.id" comes with the Token.
    // Will POPULATE found "profile" with "name" (of the user) and "avatar". These both fields are in the User model (NOT in Profile mod.)
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }
    // If profile exists, it will be sent
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/profile/
// @desc    Create or update user profile
// @access  Private
router.post(
  '/',
  [
    // Authorisation diddleware
    auth,
    // Input check middleware
    [
      check('status', 'Status is required')
        .not()
        .isEmpty(),
      check('skills', 'Skills are required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    // If there are errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin
    } = req.body;

    // Build profile object
    const profileFields = {};
    // "req.user.id" - already know from the token
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
      // ".split(',')" will split a list into array
      // Then it will map through an array and for each "skill" it will get rid of empty space around it
      profileFields.skills = skills.split(',').map(skill => skill.trim());
    }

    // Build "social" object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (facebook) profileFields.social.facebook = facebook;
    if (twitter) profileFields.social.twitter = twitter;
    if (instagram) profileFields.social.instagram = instagram;
    if (linkedin) profileFields.social.linkedin = linkedin;

    try {
      // Whenever we use Mongoose method, we need "await" in front because it returns a promise
      let profile = await Profile.findOne({ user: req.user.id });
      // // If profile is found
      if (profile) {
        // Update
        profile = await Profile.findOneAndUpdate(
          // searches by the user id
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }

      // // If profile is not found
      // Create
      profile = new Profile(profileFields);
      // Saving to DB
      await profile.save();
      // Sending back
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET api/profile/
// @desc    Get all profiles
// @access  Public
router.get('/', async (req, res) => {
  try {
    // .populate('user',...) - will populate FROM "user" colection, and passing array of fields which we want to add
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public
router.get('/user/:user_id', async (req, res) => {
  try {
    // user_id will come from url string: "req.params.user_id"
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({ msg: 'Profile not found' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    // If entered user_id is of different format
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
