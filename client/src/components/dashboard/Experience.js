// React Arrow Function Component w/ PropTypes (racfp)
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
// To format dates
import Moment from 'react-moment';
import { connect } from 'react-redux';

// Experiences will be passed in from the parrent component i.e. Dashboard.js
const Experience = ({ experience }) => {
  // 'experience' from the props is an array
  const experiences = experience.map(exp => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td className='hide-sm'>{exp.title}</td>
      <td>
        <Moment format='DD/MM/YYYY'>{exp.from}</Moment> -{' '}
        {exp.to === null ? (
          'Now'
        ) : (
          <Moment format='DD/MM/YYYY'>{exp.to}</Moment>
        )}
      </td>
      <td>
        <button className='btn btn-danger'>Delete</button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className='my-2'>Experience Credentials</h2>
      <table className='table'>
        <thead>
          {/* table row */}
          <tr>
            {/* table heading */}
            <th>Company</th>
            {/* "hide-sm" to hide on mobile screen because it will be to many columns for small screen */}
            <th className='hide-sm'>Title</th>
            <th className='hide-sm'>Years</th>
            {/* For delete button */}
            <th />
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </Fragment>
  );
};

Experience.propTypes = {
  experience: PropTypes.array.isRequired
};

export default Experience;
