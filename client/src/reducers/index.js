//It is a 'rootReducer'

import { combineReducers } from 'redux';
import alert from './alert';

// It takes an object that will have any reducers that we will create...
export default combineReducers({
  alert
});
