import { GET_POSTS, POST_ERROR } from '../actions/types';

// Initial state
const initialState = {
  post: [],
  post: null,
  loading: true,
  // obj.
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
