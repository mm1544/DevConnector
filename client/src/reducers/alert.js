/*
Function that takes a piece of state (state that has to do with alerts) and action (action will get dispatched from 'actions' file)...
*/

import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

// Array of alerts (initialy is empty)
const initialState = [];

// 'action' contains "type" and "payload" (data)
export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT:
      /*
      Adding an alert to the array. State is immutable therefore when returning array with a new state, it has to include all other states that are alredy there ('...state' - spread operator copies state and adds new alert). Data is in "payload". Component will be able to access this updated state.
      */
      return [...state, payload];
    case REMOVE_ALERT:
      /*
      Returns all alert except the one which ID matches the payload (In this case "payload" is an ID).
      */
      return state.filter(alert => alert.id !== payload);
    default:
      return state;
  }
}
