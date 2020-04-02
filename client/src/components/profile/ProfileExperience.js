import React from 'react';
import PropTypes from 'prop-types';
// To format the date
import Moment from 'react-moment';

const ProfileExperience = ({
  experience: { company, title, location, current, to, from, description }
}) => (
  <div>
    <h3 className='text-dark'>{company}</h3>
    <p>
      <Moment format='DD/MM/YYYY'>{from}</Moment> -{' '}
      {!to ? ' Now' : <Moment format='DD/MM/YYYY'>{to}</Moment>}
    </p>
    <p>
      <strong>Position: </strong> {title}
    </p>
    <p>
      <strong>Description: </strong> {description}
    </p>
  </div>
);

ProfileExperience.propTypes = {
  // experience: PropTypes.array.isRequired
  experience: PropTypes.object.isRequired
};

export default ProfileExperience;
