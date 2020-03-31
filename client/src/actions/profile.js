// For http requests
import axios from 'axios';
import { setAlert } from './alert';

// Importing types
import { GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE } from './types';

/*
#Get current users profile.
  Will cal this action ass soon as user goes to the dashboard.
*/
export const getCurrentProfile = () => async dispatch => {
  // Making request to the back-end
  try {
    // Route returns a profile data
    const res = await axios.get('/api/profile/me');

    // It will know what profile to load from the token that we send (token has user ID)

    dispatch({
      type: GET_PROFILE,
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

/*
#Create or update profile
  We will want to REDIRECT after submitting form, therefore need to pass 'history' object which has a 'push' method, it will redirect to the client side route (!!!).
  In order to know if it intended to update or edit, or create new profile, will pass parameter 'edit' which by the default is false.
*/
export const createProfile = (
  formData,
  history,
  edit = false
) => async dispatch => {
  try {
    // Because we are !sending data! we need to create 'config' obj.
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    /*
    Make a POST request to 'api/profile' (route to create or update profile). It will return a Profile.
    */
    const res = await axios.post('api/profile', formData, config);

    // Calls reducer to deal with returned Profile data
    dispatch({
      type: GET_PROFILE,
      payload: res.data //profile
    });

    // If edit===true, then passing 'Profile Updated'.
    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

    // For creating a NEW profile
    if (!edit) {
      // Calling 'push' meyhod on history obj. and !!!redirects to '/dashboard'. 'Redirecting' in an action is different than in Components where we use <Redirect>.
      history.push('/dashboard');
    }
  } catch (err) {
    // For validation errors (e.g. if forgot a 'status', or 'skils')
    const errors = err.response.data.errors;
    // If there are any errors, will loop through them and for each error will 'dispatch' 'setAlert'
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      // HTTP status: 'err.response.status' (eg. '400')
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add Experience Action
// Need to pass 'history' because want to redirect back to '/dashboard'
export const addExperience = (formData, history) => async dispatch => {
  try {
    // Because sending data
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.put('api/profile/experience', formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      // Profile
      payload: res.data
    });

    dispatch(setAlert('Experience Added', 'success'));

    // Redirecting
    history.push('/dashboard');
  } catch (err) {
    // errors array for fields of experiences
    const errors = err.response.data.errors;

    if (errors) {
      // If there are 'errors', then will set alerts
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add Education Action
export const addEducation = (formData, history) => async dispatch => {
  try {
    // Because sending data
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.put('api/profile/education', formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      // Profile
      payload: res.data
    });

    dispatch(setAlert('Education Added', 'success'));

    // Redirecting
    history.push('/dashboard');
  } catch (err) {
    // errors array for fields of experiences
    const errors = err.response.data.errors;

    if (errors) {
      // If there are 'errors', then will set alerts
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
