/*
Will fetch all the data by using an action, and will bring it in from the Redux state (then will pass that data to the other components: - experiance and education)
*/

// (shortcut: racfp)

import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';

/*
Want to call getCurrentProfile() as soon as Dasboard loads, in order to do that, since we are using hooks, will use 'useEffect'
*/

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading }
}) => {
  // Because we want to run it once, will pass '[]' as a second argument
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  // ...if profile is NULL and it is still loading then will show the Spinner
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        {/* '{user && user.name}' - if user exist then show username */}
        <i className='fas fa-user'></i>Welcome {user && user.name}
      </p>
      {profile != null ? (
        <Fragment>
          <DashboardActions />
          {/* passing 'experience' array */}
          <Experience experience={profile.experience} />
          <Education education={profile.education} />
          <div className='my-2'>
            <button className='btn btn-danger' onClick={() => deleteAccount()}>
              <i className='fas fa-user-minus'></i> Delete My Account
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to='/create-profile' className='btn btn-primary my-1'>
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

// Need to make sure that profile is loaded, and that it is not null. If it is, then show a spinner graphics.

Dashboard.propTypes = {
  //...because it is a function (shortcut: ptfr)
  getCurrentProfile: PropTypes.func.isRequired,

  deleteAccount: PropTypes.func.isRequired,
  // ...object required ('ptor')
  auth: PropTypes.object.isRequired,
  // profile state ('ptor')
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

// Within 'connect' will be getting 'profile' state and as well 'auth' state.
export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);

/*
When Dashboard loads, we need to pull-in current user's profile. To be able to do that we need a profile in our state, which means that we need profile-reducer, profile-action file.
*/
