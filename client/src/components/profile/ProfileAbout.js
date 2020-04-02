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
  <div class='profile-about bg-light p-2'>
    {/* Because 'bio' field entry is optional */}
    {bio && (
      <Fragment>
        {/* 'name.trim().split(' ')[0]' is to extract the name */}
        <h2 class='text-primary'>Bio of {name.trim().split(' ')[0]}</h2>
        <p>{bio}</p>
        {/* <!-- Creates a line --> */}
        <div class='line'></div>
      </Fragment>
    )}

    <h2 class='text-primary'>Skill Set</h2>
    <div class='skills'>
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
