import React from 'react';
import { Link, Redirect } from 'react-router-dom';
// To be able to interact with the state to see if user is logged-in
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({ isAuthenticated }) => {
  // If user is loged-in, he cant see/access the Landing-page
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <section className='landing'>
      {/* <!-- We will have a background image but we need  a dark overlay, so that the text is readable, and you can use any image--> */}
      <div className='dark-overlay'>
        <div className='landing-inner'>
          {/* <!-- For headings --> */}
          <h1 className='x-large'>Developer Connector</h1>
          <p className='lead'>
            Create developer profile/portfolio, share posts and get help from
            other developers
          </p>
          <div className='buttons'>
            <Link to='/register' className='btn btn-primary'>
              Sign Up
            </Link>
            <Link to='/login' className='btn'>
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

Landing.propTypes = {
  // 'ptb'
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
