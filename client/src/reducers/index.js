//This is a ROOT Reducer
// Redux actions flow: creating-reducer => creating-actions => creating-component

import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import post from './post';

// It takes an object that will have any reducers that we will create...
export default combineReducers({
  alert,
  auth,
  profile,
  post
});
