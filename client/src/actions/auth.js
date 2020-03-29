// To make requests to the backend
import axios from 'axios';
// Importing an action (can be called from anywhere)
import { setAlert } from './alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTH_ERROR,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE
} from './types';
import setAuthToken from '../utils/setAuthToken';

// Load User Action
export const loadUser = () => async dispatch => {
  /*
  Need to check if there is a token, And if it is there, will put it into GLOBAL HEADER... If there is a Token in local storage, want send it with every request.
  */

  // Checking localStorage
  if (localStorage.token) {
    // Will set the header (global header) with the token
    setAuthToken(localStorage.token);
  }

  // Making request
  try {
    const res = await axios.get('/api/auth');
    // If that is successful then will !dispatch loaded user!
    dispatch({
      type: USER_LOADED,
      // payload is the data that sent from this route(ie. the user)
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// Register User Action
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

    dispatch(loadUser());

    // 'errors' is an array of errors from the back-end
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

// Login User Action
export const login = (email, password) => async dispatch => {
  // Because the data will be sent, need 'config'
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  // Creating an object from email and password
  const body = JSON.stringify({ email, password });

  try {
    // Post request (hitting endpoint '/api/auth' and sending 'body' and 'config')
    const res = await axios.post('/api/auth', body, config);

    // When login is successful
    dispatch({
      type: LOGIN_SUCCESS,
      // will send the data as a payload
      payload: res.data
    });

    // ? Dispatching loadUser action
    dispatch(loadUser());
  } catch (err) {
    // 'errors' is an array of errors (from the back-end)
    const errors = err.response.data.errors;
    // If there are any errors, will loop through them and for each error will 'dispatch' 'setAlert'
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// Logout Action / Clear Profile
export const logout = () => dispatch => {
  // When logging-out, CLEAR_PROFILE will be called
  dispatch({
    type: CLEAR_PROFILE
  });
  dispatch({
    type: LOGOUT
  });
};
