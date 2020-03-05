import React from 'react';

const Navbar = () => {
  return (
    <nav className='navbar bg-dark'>
      <h1>
        <a href='dashboard.html'>
          {' '}
          <i className='fas fa-code'></i> DevConnector{' '}
        </a>
      </h1>
      <ul>
        <li>
          <a href='profiles.html'>Developers</a>
        </li>
        <li>
          <a href='register.html'>Register</a>
        </li>
        <li>
          <a href='login.html'>Login</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

/*
For the beginning, the output is going to be a static HTML. 
Later the state from Redux will be pulled and and based on that will decide what links to show.
*/
