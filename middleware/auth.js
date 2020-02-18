const jwt = require('jsonwebtoken');
// to access "jwtSecret"
const config = require('config');

// middleware function has an access to request and response objects. "next" - is a callback fn, which we have to call when we are done, so it moves to the next peace of middleware
module.exports = function(req, res, next) {
  // Get token from the header (when we send request to the protected route, we send a token within the header ). "x-auth-token" is a header-key
  const token = req.header('x-auth-token');

  // Check if no token
  if (!token) {
    // "401" - status: Not authorised
    return res.status(401).json({ msg: 'No token, authorisation denied' });
  }

  // If there is a Token, then verify it
  try {
    // To decode the token: "verify(..)" takes in token and the jwtSecret
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    // Takes the request obj. and assigns value to user. "decoded" has "user" in the "payload"
    // This updated "req.user" can be used in any of our protected routes
    req.user = decoded.user;
    next();
    // If token is not valid
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
