// For http requsts
import axios from 'axios';
import { setAlert } from './alert';
import { GET_POSTS, POST_ERROR, UPDATE_LIKES } from './types';

// Get Posts Action
export const getPosts = () => async dispatch => {
  try {
    const res = await axios.get('/api/posts');

    dispatch({
      type: GET_POSTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add Like Action
export const addLike = postId => async dispatch => {
  try {
    // 'put' request because updating the 'post'
    // Returned is an array of likes
    const res = await axios.put(`/api/posts/like/${postId}`);

    dispatch({
      type: UPDATE_LIKES,
      // id/postId ?
      payload: { id: postId, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Remove Like Action
export const removeLike = postId => async dispatch => {
  try {
    // 'put' request because updating the 'post'
    // Returned is an array of likes
    const res = await axios.put(`/api/posts/unlike/${postId}`);

    dispatch({
      type: UPDATE_LIKES,
      // id/postId ?
      payload: { id: postId, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
