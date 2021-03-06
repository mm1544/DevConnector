/*
Why it is needed:
When Dashboard loads, we need to pull-in current user's profile. To be able to do that we need a profile in our state, which means that we need profile-reducer, profile-action file.
*/

import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  GET_PROFILES,
  GET_REPOS
} from '../actions/types';

const initialState = {
  /* After we logged the 'profile' will hold all profile-data. As well if we will wisit another users profile page, the data about that user will be stored in here as well.
   */
  profile: null,
  // For profile listing page... For the list of developers
  profiles: [],
  // For fetched Github repos
  repos: [],
  // Once the request is made/responded, it will be set to false
  loading: true,
  // Obj. for any errors in the request
  error: {}
};

// Reducer function
export default function(state = initialState, action) {
  // Destructuring action
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        // current state
        ...state,
        // setting payload (payload is the whole profile) to the profile
        profile: payload,
        // ...when the request is done
        loading: false
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false
      };

    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        profile: null
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        loading: false
      };
    case GET_REPOS:
      return {
        ...state,
        repos: payload,
        loading: false
      };
    default:
      return state;
  }
}
