// To make requests to the backend
import axios from 'axios';
// Importing an action
import { setAlert } from './alert';
import { REGISTER_SUCCESS, REGISTER_FAIL } from './types';

// Register User
export const register = ({ name, email, password }) => async dispatch => {
  // Function body goes into {...}

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  // Preparing the data to be sent
  const body = JSON.stringify({ name, email, password });

  try {
    /*
    Making a Post requst. Will get the responce 'res' back.

    post is taking endpoint '/api/users'...
    */
    const res = await axios.post('/api/users', body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      // Got a token back on successful responce
      payload: res.data
    });
    // 'err' is an array of errors from the back-end
  } catch (err) {
    const errors = err.response.data.errors;
    // If there are any errors, will loop through them and for each error will 'dispatch' 'setAlert'
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: REGISTER_FAIL
    });
  }
};
