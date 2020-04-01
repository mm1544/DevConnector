// For http requests
import axios from 'axios';
import { setAlert } from './alert';

// Importing types
import {
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  ACCOUNT_DELETED,
  GET_PROFILES,
  GET_REPOS
} from './types';

/*
Get Current User's Profile Action
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

// Get All Profiles Action
export const getProfiles = () => async dispatch => {
  // To clear whatever is in 'current profile' (because when we wisit single user's profile, the data of this profile is added to the state)
  dispatch({ CLEAR_PROFILE });

  try {
    const res = await axios.get('/api/profile');

    dispatch({
      type: GET_PROFILES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get Profile By ID Action
export const getProfileById = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/profile/user/${userId}`);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get Github Repos Action (takes as parameter Github username)
export const getGithubRepos = username => async dispatch => {
  try {
    const res = await axios.get(`/api/profile/github/${username}`);

    dispatch({
      type: GET_REPOS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

/*
Create or Update Profile Action
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

// Delete Experience  Action
export const deleteExperience = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Experience Removed', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete Education  Action
export const deleteEducation = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Education Removed', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete Account & Profile Action
// Will not take-in any parameters, it will know account from the token (!!)
export const deleteAccount = () => async dispatch => {
  // Since it is critically dangerous functionality, will ask for confirmation
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    try {
      const res = await axios.delete('/api/profile');

      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: ACCOUNT_DELETED });

      dispatch(setAlert('Your account has been permanently deleted'));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
};
