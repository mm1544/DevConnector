import { REGISTER_SUCCESS, REGISTER_FAIL } from '../actions/types';

// State for authentication
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
  user: null
};

// Takes in the 'action' which is dispatched
export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_SUCCESS:
      // Want the user to be logged-in, therefore will put token (which is returned) to the localStorage
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

    case REGISTER_FAIL:
      // Removes everything what is stored in localStorage as a 'token'
      localStorage.removeItem('token');
      return {
        ...state,
        // 'token' value in the state is set to null
        token: null,
        isAuthenticated: false,
        loading: false
      };
    default:
      return state;
  }
}
