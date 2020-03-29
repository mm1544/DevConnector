//This is a ROOT Reducer

import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';

// It takes an object that will have any reducers that we will create...
export default combineReducers({
  alert,
  auth,
  profile
});
