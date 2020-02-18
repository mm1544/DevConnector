// Will handdle getting JWT(jsonwebtoken) for authentication

const express = require('express');
// Need Express router to have routes in separate files.
const router = express.Router();
const bcrypt = require('bcryptjs');
// Importing middleware for autorisation
const auth = require('../../middleware/auth');
const User = require('../../models/User');
// to be able access default.json
const config = require('config');
// Express-validator
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

// @route   GET api/auth
// @desc    Test route. Using "auth" middleware will make this route protected. This route has to return user's data.
// @access  Public
router.get('/', auth, async (req, res) => {
  try {
    // This is protected route and we use a token that has the id. In middleware we set "req.user" = to the "user" in the token (decoded.user).
    // Don't want to return password, therefore: ".select('-password')"
    const user = await User.findById(req.user.id).select('-password');
    // Sending user
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/auth
// @desc    Authenticate user & get token (Logging in)
// @access  Public
router.post(
  '/',
  [
    // Middleware for entry validation
    check('email', 'Enter a valid Email').isEmail(),
    check('password', 'Password is required').exists()
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

    const { email, password } = req.body;

    try {
      // Check if user exists. Searching by "email"
      let user = await User.findOne({ email: email });

      // If there is no user
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      // Need to make sure that password matches. "bcrypt" will take encrypted password and "plain" password, and tells if they match. "compare" returns a promise.
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      // // Return jsonwebtoken (to log-in you need JWT)
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
