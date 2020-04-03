import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';

const PostForm = ({ addPost }) => {
  // 'text' is a string, initially set to ''
  const [text, setText] = useState('');
  return (
    <div className='post-form'>
      <div className='p bg-primary'>
        <h3>Say Something...</h3>
      </div>
      <form
        className='form my-1'
        onSubmit={e => {
          e.preventDefault();
          // 'text' is passed as an object
          addPost({ text });
          // To clear the form
          setText('');
        }}
      >
        <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='Create a post'
          // From component-state
          value={text}
          // value of the input - 'e.target.value'
          onChange={e => setText(e.target.value)}
          required
        ></textarea>
        <input type='submit' value='Submit' className='btn btn-dark my-1' />
      </form>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired
};

// Not using 'state' from Redux therefore will pass 'null'
export default connect(null, { addPost })(PostForm);
