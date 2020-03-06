import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
/*
 Each input needs to have its own state. Need onchangeHandler to update the state when it is typing. Will use useState Hook.
*/
const Register = () => {
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

  // Destructuring for convenience
  const { name, email, password, password2 } = formData;

  /*
  "setFormData" will make a copy of current state/formData (...formData -- spread operator), then we will pass a new value of a field that we want to change. Because of "[e.target.name]" can use "onChange" on any input field.
  */

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    // Preventing default action ie. reloading (??)
    e.preventDefault();
    // when using useState Hook, can access the state from anywhere (no need to pass the state)
    if (password !== password2) {
      // Will make it an alert later
      console.log('Passwords do not match');
    } else {
      console.log('success');
    }
  };

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
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={e => onChange(e)}
            required
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
            minLength='6'
            name='password'
            value={password}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirm Password'
            minLength='6'
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

export default Register;
