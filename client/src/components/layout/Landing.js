import React from 'react';

const Landing = () => {
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
            <a href='register.html' className='btn btn-primary'>
              Sign Up
            </a>
            <a href='login.html' className='btn'>
              Login
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
