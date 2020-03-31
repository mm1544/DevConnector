// React Arrow Function Component w/ PropTypes (racfp)
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
// To format dates
import Moment from 'react-moment';
import { connect } from 'react-redux';

const Education = ({ education }) => {
  const educations = education.map(edu => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td className='hide-sm'>{edu.degree}</td>
      <td>
        <Moment format='DD/MM/YYYY'>{edu.from}</Moment> -{' '}
        {edu.to === null ? (
          'Now'
        ) : (
          <Moment format='DD/MM/YYYY'>{edu.to}</Moment>
        )}
      </td>
      <td>
        <button className='btn btn-danger'>Delete</button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className='my-2'>Education Credentials</h2>
      <table className='table'>
        <thead>
          {/* table row */}
          <tr>
            {/* table heading */}
            <th>School</th>
            {/* "hide-sm" to hide on mobile screen because it will be to many columns for small screen */}
            <th className='hide-sm'>Degree</th>
            <th className='hide-sm'>Years</th>
            {/* For delete button */}
            <th />
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </Fragment>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired
};

export default Education;
