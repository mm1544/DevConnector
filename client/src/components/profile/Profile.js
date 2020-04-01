import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfileById } from '../../actions/profile';

const Profile = ({
  getProfileById,
  profile: { profile, loading },
  auth,
  match
}) => {
  // Will run imediately when Profile mounts
  useEffect(() => {
    // Will get ID from URL (props.match.params.id)
    getProfileById(match.params.id);
  }, [getProfileById]);

  return (
    <Fragment>
      {/* Need to make sure that the data is loaded, because can't render UI if data is not loaded. */}
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to='/profiles' className='btn btn-light'>
            Back To Profiles
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to='/edit-profile' className='btn btn-dark'>
                Edit Profile
              </Link>
            )}
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  // Need 'auth' state because we want to see if the user is logged-in, and if he is logged and the profile that he is viewing matches, then we want to add edit-profile button.
  auth: state.auth
});

export default connect(mapStateToProps, { getProfileById })(Profile);
