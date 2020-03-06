import React from 'react';
// in HTML code we had a tags, but for React will change it to Link tags
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='fas fa-code'></i>DevConnector
        </Link>
      </h1>
      <ul>
        <li>
          <Link to='!#'>Developers</Link>
        </li>
        <li>
          <Link to='/register'>Register</Link>
        </li>
        <li>
          <Link to='/login'>Login</Link>
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
