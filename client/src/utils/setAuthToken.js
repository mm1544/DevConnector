/*
Function that takes in the token and if the token is there, then it will add it to the Headers, and if not - will delete it from Headers.
*/

// Will be adding global header with axios (not making request)
import axios from 'axios';

/*
 Why to do it? - When we have a Token we will send it with !every request! instead of manually(?) picking and choosing with what request to send the token with.
*/
const setAuthToken = token => {
  if (token) {
    // Token that we are passing is from localStorage. It will check if token is in local storage, and if there is one, then we will set the !global header! with 'axios'.

    // The header that we are setting is 'x-auth-token'
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    // If what we are passing is !not a token, then we will delete it from the !Global Headers!
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export default setAuthToken;
