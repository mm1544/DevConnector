// Main App component

// Fragment is a "gost" element it will not show up in the DOM
import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
// Route with embeded authentication
import PrivateRoute from './components/routing/PrivateRoute';
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
          <Route exact path='/' component={Landing} />
          {/* Every page within the theme (except for the landing page) has a className="container" to push the content to the middle */}
          <section className='container'>
            <Alert />
            {/* Wrapping everything in the Switch. Switch can have only routes in it */}
            <Switch>
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/profiles' component={Profiles} />
              <Route exact path='/profile/:id' component={Profile} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <PrivateRoute
                exact
                path='/create-profile'
                component={CreateProfile}
              />
              <PrivateRoute
                exact
                path='/edit-profile'
                component={EditProfile}
              />
              <PrivateRoute
                exact
                path='/add-experience'
                component={AddExperience}
              />
              <PrivateRoute
                exact
                path='/add-education'
                component={AddEducation}
              />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
