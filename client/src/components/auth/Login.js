import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
// Connecting to Redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// Login action
import { login } from '../../actions/auth';

/*
 Input needs to have its own state. Need onchangeHandler to update the state when it is typing. Will use useState Hook.

 destructuring 'prop' to '{login}'
*/
const Login = ({ login, isAuthenticated }) => {
  /*
  "formData" is a state/object with all the field values. "setFormData" - is a function to update the state.
  To "useState" passing initial state
  */
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // Destructuring for convenience
  const { email, password } = formData;

  /*
  "setFormData" will make a copy of current state/formData (...formData -- spread operator), then we will pass a new value of a field that we want to change. Because of "[e.target.name]" can use "onChange" on any input field.
  */

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    // Preventing default action ie. reloading (?)
    e.preventDefault();

    // Calling action (!!)
    login(email, password);
  };

  // Redirect if logged in
  if (isAuthenticated) {
    // With React router can do '<Redirect...>'
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      {/* HTML's "class" is changed to React's "className" */}
      <h1 className='large text-primary'>Sign In</h1>
      <p className='lead'>
        <i className='fas fa-user'></i>Sign Into Your Account
      </p>
      {/* <!-- FORM. All the forms will have the same styling, therefore className "form" is given --> */}
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            minLength='6'
            name='password'
            value={password}
            onChange={e => onChange(e)}
          />
        </div>
        <input type='submit' value='Login' className='btn btn-primary' />
      </form>

      {/* <!-- "my" margin on y axis (top and bottom)--> */}
      <p className='my-1'>
        Don't have an account?<Link to='/register'>Sign Un</Link>
      </p>
    </Fragment>
  );
};

// Since we have 'login' in 'props', need to set the propTypes...
Login.propTypes = {
  // shortcut: ptfr
  login: PropTypes.func.isRequired,
  // shortcut: 'ptb' (boolean prop type)
  isAuthenticated: PropTypes.bool
};

// Getting 'isAuthenticated' from 'state.auth' and preparing it to be added to 'props'
const mapStateProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

// For now mapping state to props in 'null'
// Passing actions as obj. - '{login}'. Now 'login' is in 'prop'.
export default connect(mapStateProps, { login })(Login);
