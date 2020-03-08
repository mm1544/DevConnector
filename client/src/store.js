import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
// Will be useing multiple reducers (for "auth", "profile", "alert", etc.)but will combine them into the "rootReducer".
// The full path is './reducers/index.js', but following is sufficient
import rootReducer from './reducers';

// Initial state (empty object)
const initialState = {};

const middleware = [thunk];

// Creating Store
// Third parameter is a middleware. Since we use devtools-extension, we can use 'composeWithDevTools'
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
