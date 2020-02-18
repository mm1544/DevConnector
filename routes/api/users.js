// Will handle registering users and adding users

const express = require('express');
// Need Express Router to have routes in separate files.
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// to be able access default.json
const config = require('config');
// Express-validator
const { check, validationResult } = require('express-validator');

// Importing/requiring User model
const User = require('../../models/User');

// @route   POST api/users
// @desc    Register user. Need to send name, email and a password to register the user.
// @access  Public
router.post(
  '/',
  [
    // Middleware for entry validation
    // To validate entries. Checking for the eg. "name" and passing custom Error message as second param.
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Enter a valid Email').isEmail(),
    check(
      'password',
      'Please enter a password of 6 or more characters'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    // "req.body" - is the object of data that is going to be sent to this route
    // To be able to use "req.body" need to initialise a middleware for the body parser. Parser is included with Express.
    const errors = validationResult(req);
    // "!errors.isEmpty()" => if there are errors
    if (!errors.isEmpty()) {
      // "400" => bad request. Array off "errors" will be sent back
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // Check if user exists (to avoid duplicated users). Searching by "email"
      let user = await User.findOne({ email: email });

      if (user) {
        // Want to get back, on the client-side, the same type (format) of errors as we had for the input validation errors
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      // Get user's gravatar (it is based on their email)
      const avatar = gravatar.url(email, {
        // options to pass: s - size, r - rating(to avoid eg. nudity), d - default
        s: '200',
        r: 'pg',
        d: 'mm'
      });

      // New instance of User (it is not saved on the DB yet)
      user = new User({
        name,
        email,
        avatar,
        password
      });

      // Encrypting password (with bcrypt)
      // Before encryption using "salt" to do the hashing with. We can get "promisse" from "bcrypt", therefore will use "await".
      const salt = await bcrypt.genSalt(10);

      // Will create a "hash" and will put it into "user.password"
      user.password = await bcrypt.hash(password, salt);

      // Saving to the DB (need "await" inf front of any method that returns a promisse)
      await user.save();

      // // Return jsonwebtoken (need jwt because in the front-end, when the user registers, we want them to get logged-in right away, and to log-in you need JWT)
      // Creating  a payload for JWT. Will get "user.id" when user is saved to DB
      const payload = {
        user: {
          id: user.id
        }
      };

      // // "signing" the token (passing: payload, "secret", expiration-time and callback fn )
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        // Callback fn takes a possible error and a token itself
        (err, token) => {
          if (err) throw err;
          //If no error, then sending a token back to client. That token will be used to access protected routes. Token placed in header.
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
