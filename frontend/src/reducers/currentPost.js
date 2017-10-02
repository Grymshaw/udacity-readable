// import * as actions from '../actions/currentPost';
// import * as types from '../constants/ActionTypes';

const defaultState = {
  currentPost: undefined,
};

const currentPost = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_POST':
      return { currentPost: action.postId };
    default:
      return state;
  }
};

export default currentPost;
