// import uuid from 'uuid';
import { v4 as uuidv4 } from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';

/*
Action setAlert will dispatch(?) the 'type'= SET_ALERT to the reducer (reducers/alert.js) and reducer will add this alert to the state (which initialy is empty array)
*/

// Able to do "...=> dispatch =>..." because of "thunk" middleware
export const setAlert = (msg, alertType, timeout = 5000) => dispatch => {
  const id = uuidv4();
  // It accesses reducer (../reducers/alert.js)
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id }
  });

  /*
  JS function, will execute after set time. 'payload' is ID of alert.
  */
  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};
