import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

// CONNECTING Register component to the Redux by using 'connect' (from react-redux package)
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
// Prop types
import PropTypes from 'prop-types';

/*
 Each input needs to have its own state. Need onchangeHandler to update the state when it is typing. Will use useState Hook.
 ('connect' allows to access props.setAlert).
 Destructuring 'props' --> {setAlert}
*/
const Register = ({ setAlert, register, isAuthenticated }) => {
  /*
  "formData" is a state/object with all the field values. "setFormData" - is a function to update the state.
  To "useState" passing initial state
  */

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  // Destructuring for convenience ('formData' is a COMPONENT state)
  const { name, email, password, password2 } = formData;

  /*
  "setFormData" will make a copy of current state/formData (...formData -- spread operator), then we will pass a new value of a field that we want to change. Because of "[e.target.name]" can use "onChange" on any input field.
  */

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    // Preventing default action ie. reloading (??)
    e.preventDefault();
    // When using useState Hook, can access the state from anywhere (no need to pass the state)
    if (password !== password2) {
      // setAlert(msg, alertType, )
      setAlert('Passwords do not match', 'danger');
    } else {
      // Calling an function/action 'register'
      register({ name, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      {/* HTML's "class" is changed to React's "className" */}
      <h1 className='large text-primary'>Sign Up</h1>
      <p className='lead'>
        <i className='fas fa-user'></i>Create Your Account
      </p>
      {/* <!-- FORM. All the forms will have the same styling, therefore className "form" is given --> */}
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          {/* Associating "name" in the state (formData) with an input */}
          <input
            type='text'
            placeholder='Name'
            name='name'
            value={name}
            // Calling custom "onChange" method (which will use "setFormData") to update "name" field of the state
            onChange={e => onChange(e)}
            // required
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={e => onChange(e)}
            // required
          />
          <small className='form-text'>
            This site uses Gravatar, so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            // minLength='6'
            name='password'
            value={password}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirm Password'
            // minLength='6'
            name='password2'
            value={password2}
            onChange={e => onChange(e)}
          />
        </div>
        <input type='submit' value='Register' className='btn btn-primary' />
      </form>

      {/* <!-- "my" margin on y axis (top and bottom)--> */}
      <p className='my-1'>
        Already have an account?<Link to='/login'>Sign In</Link>
      </p>
    </Fragment>
  );
};

Register.propTypes = {
  // 'setAlert' as a PropType. It is a function (shortcut: ptfr)
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  // shortcut: 'ptb' (boolean prop type)
  isAuthenticated: PropTypes.bool
};

// Getting 'isAuthenticated' from 'state.auth' and preparing it to be added to 'props'
const mapStateProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

/*
When using 'connect' need to include it to the export. Connect takes in 2 parameters: state that you want to map(?) and object with actions that you want to use. Passing 'setAlert' in here, makes 'setAlert' awailable within props "props.setAlert"
*/

export default connect(mapStateProps, { setAlert, register })(Register);

/*
Summary:
Importing 'connect' allwes to work with Redux. Importing 'setAlert' action and adding 'setAlert' to the export allwes us to access it within props. 
*/
