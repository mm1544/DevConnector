/*
Reducer 'handles' when 'action' are 'dispatched'
*/

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTH_ERROR,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL
} from '../actions/types';

// Will be referenced as 'state.auth' (!!!)
const initialState = {
  /*
  That is the default for a token in our state. 
  If token is in localStorage, we will fetch the token and put it inside the state
  */
  token: localStorage.getItem('token'),

  /*
  Initially it is 'null'. When will make a request to register, or to login and will get successful response, 'isAuthenticated' will be set to true
  */
  isAuthenticated: null,
  /*
  To make sure that the loading is done. Eg. when want to be shure that when made a request, the request is gotten.
  */

  loading: true,
  /*
  When will make a request to the backend to the 'api/auth' and will get the user data (name, email, avatar ect.), it will be put in here.
  */

  user: null
};

// Takes in the 'action' which is dispatched
export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    // It will 'load' the user(in the state)
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        // Since 'payload' includes the user (name, email, avatar...)
        user: payload
      };
    // Both cases do the same
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      // Put the token in localStorage
      localStorage.setItem('token', payload.token);
      /*
      Setting  'isAuthenticated' to true, and 'loading' to false
      */
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };

    //For all cases: REGISTER_FAIL, AUTH_ERROR, LOGIN_FAIL
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
      /*
      If registration failed, want to clear localStorage from any 'token' (Don't want token that is Not walid in local storage).
      */
      localStorage.removeItem('token');
      return {
        ...state,
        // 'token' value in the state is set to null
        token: null,
        isAuthenticated: false,
        // Even it failed, the loading is done
        loading: false
      };
    default:
      return state;
  }
}
