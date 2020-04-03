// Main App component

// Fragment is a "gost" element it will not show up in the DOM
import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Routes from './components/routing/Routes';
// 'Provider' comes from React, Redux package. Redux is separate from React but Provider will combine them together...(?) We will achieve that by surrounding entire App with Provider...
import { Provider } from 'react-redux';
import store from './store';
// Importing action (to call it will use 'useEffect' hook)
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import './App.css';

// Checking localStorage
if (localStorage.token) {
  // Will set the header (global header) with the token
  setAuthToken(localStorage.token);
}

const App = () => {
  /*
  'useEffect' is a hook. Takes-in a function.

   When state updates, 'useEffect' will keep running and it will be a CONSTANT LOOP, UNLESS we will add a second parameter '[]'. In this case it will run just once. We want it just to !run once! when it is loaded/mounted (Will NOT re-run).
  */
  useEffect(() => {
    // Way to dispatch 'loadUser' action.
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      {/* // Need to wrap everything within Router */}
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route component={Routes} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
