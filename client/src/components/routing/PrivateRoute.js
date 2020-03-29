// racfp

/*
Differently from simple Route, to this PrivateRoute will add 'render' prop to see if the User is NOT authenticated and the loading is done.
*/

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/*
(Destructuring props)
Taking FROM 'component' that is passed in. 
Then we want to get any other PARAMETERS that are passed in, therefore will use '...rest' operator. 
Need to interact with the 'auth' state ('auth' reducer) in order for this to work, therefore using 'connect'.

If User is authenticated, the the Component will load.
*/

const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading },
  ...rest
}) => (
  // Anything that is passed as 'rest' (any custom props) will be in '{...rest}'
  <Route
    {...rest}
    // Need to check authentication in here. For 'else' case will load the 'Component' that is passed in (in App.js in components are passed in Routes)
    render={props =>
      !isAuthenticated && !loading ? (
        <Redirect to='/login' />
      ) : (
        <Component {...props} />
      )
    }
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  // Pulling the state, that is in 'auth' reducer
  auth: state.auth
});

// No actions will be passed
export default connect(mapStateToProps)(PrivateRoute);
