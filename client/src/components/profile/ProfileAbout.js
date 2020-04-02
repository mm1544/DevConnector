import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ProfileAbout = ({
  profile: {
    bio,
    // It's an array
    skills,
    user: { name }
  }
}) => (
  <div className='profile-about bg-light p-2'>
    {/* Because 'bio' field entry is optional */}
    {bio && (
      <Fragment>
        {/* 'name.trim().split(' ')[0]' is to extract the name */}
        <h2 className='text-primary'>Bio of {name.trim().split(' ')[0]}</h2>
        <p>{bio}</p>
        {/* <!-- Creates a line --> */}
        <div className='line'></div>
      </Fragment>
    )}

    <h2 className='text-primary'>Skill Set</h2>
    <div className='skills'>
      {skills.map((skill, index) => (
        <div key={index} className='p-1'>
          <i className='fas fa-check'></i> {skill}
        </div>
      ))}
    </div>
  </div>
);

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;
