import * as types from '../constants/ActionTypes';

const initialState = {
  currentPost: {},
  posts: {},
  isRequestPending: false,
};

const posts = (state = initialState, action) => {
  const post = {};
  let newPosts;

  switch (action.type) {
    case types.ADD_POST_REQUEST:
    case types.EDIT_POST_REQUEST:
    case types.DELETE_POST_REQUEST:
    case types.UPVOTE_POST_REQUEST:
    case types.DOWNVOTE_POST_REQUEST:
    case types.FETCH_ALL_POSTS_REQUEST:
    case types.FETCH_CATEGORY_POSTS_REQUEST:
    case types.FETCH_POST_REQUEST:
      return { ...state, isRequestPending: true };
    case types.ADD_POST_SUCCESS:
    case types.EDIT_POST_SUCCESS:
    case types.DELETE_POST_SUCCESS:
    case types.UPVOTE_POST_SUCCESS:
    case types.DOWNVOTE_POST_SUCCESS:
      post[action.post.id] = { ...action.post };
      newPosts = Object.assign({}, state.posts, post);
      return { ...state, posts: newPosts, isRequestPending: false };
    case types.FETCH_ALL_POSTS_SUCCESS:
    case types.FETCH_CATEGORY_POSTS_SUCCESS:
      newPosts = action.posts.reduce((acc, cur) => {
        acc[cur.id] = cur;
        return acc;
      }, {});
      return { ...state, posts: newPosts, isRequestPending: false };
    case types.FETCH_POST_SUCCESS:
      return { ...state, currentPost: action.post, isRequestPending: false };
    case types.SET_CURRENT_POST:
      return { ...state, currentPost: action.id };
    default:
      return state;
  }
};

export default posts;
