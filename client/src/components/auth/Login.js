import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

/*
 Each input needs to have its own state. Need onchangeHandler to update the state when it is typing. Will use useState Hook.
*/
const Login = () => {
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

    console.log('success');
  };

  return (
    <Fragment>
      {/* HTML's "class" is changed to React's "className" */}
      <h1 className='large text-primary'>Sign Ip</h1>
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

export default Login;
