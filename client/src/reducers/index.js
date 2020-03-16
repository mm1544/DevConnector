//It is a 'rootReducer'

import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';

// It takes an object that will have any reducers that we will create...
export default combineReducers({
  alert,
  auth
});
