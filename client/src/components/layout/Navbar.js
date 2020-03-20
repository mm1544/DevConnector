import React, { Fragment } from 'react';
// in HTML code we had a tags, but for React will change it to Link tags
import { Link } from 'react-router-dom';
//To connect to Redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// Logout action
import { logout } from '../../actions/auth';

/*
Destructuring 'prop' to {...}. From 'auth' pulling 'loading' because need to make sure that loading is done before will be putting Links in.
*/
const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  // Links seen for authenticated users
  const authLinks = (
    <ul>
      <li>
        <a onClick={logout} href='#!'>
          <i className='fas fa-sign-out-alt'></i>{' '}
          {/* 'hide-sm' - css class used to hide text on small device */}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </ul>
  );

  // Links visible without logging in
  const guestLinks = (
    <ul>
      <li>
        <a href='#!'>Developers</a>
      </li>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='fas fa-code'></i>DevConnector
        </Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  // 'ptfr'
  logout: PropTypes.func.isRequired,
  // 'ptor'
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);

/*
For the beginning, the output is going to be a static HTML. 
Later the state from Redux will be pulled and and based on that will decide what links to show.
*/
