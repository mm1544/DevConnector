// For http requests
import axios from 'axios';
import { setAlert } from './alert';

// Importing types
import { GET_PROFILE, PROFILE_ERROR } from './types';

// Get current users profile. Will cal this action ass soon as user goes to the dashboard.
export const getCurrentProfile = () => async dispatch => {
  // Making request to the back-end
  try {
    // Route returns a profile data
    const res = await axios.get('/api/profile/me');

    // It will know what profile to load from the token that we send (token has user ID)

    dispatch({
      type: GET_PROFILE,
      // Route returns a profile data
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      // HTTP status: 'err.response.status' (eg. '400')
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
