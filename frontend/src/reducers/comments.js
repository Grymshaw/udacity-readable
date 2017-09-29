import * as types from '../constants/ActionTypes';

const initialState = {
  comments: {},
  isRequestPending: false,
};

const comments = (state = initialState, action) => {
  const comment = {};
  let newComments;

  switch (action.type) {
    case types.ADD_COMMENT_REQUEST:
    case types.EDIT_COMMENT_REQUEST:
    case types.DELETE_COMMENT_REQUEST:
    case types.UPVOTE_COMMENT_REQUEST:
    case types.DOWNVOTE_COMMENT_REQUEST:
    case types.FETCH_POST_COMMENTS_REQUEST:
      return { ...state, isRequestPending: true };
    case types.ADD_COMMENT_SUCCESS:
    case types.EDIT_COMMENT_SUCCESS:
    case types.DELETE_COMMENT_SUCCESS:
    case types.UPVOTE_COMMENT_SUCCESS:
    case types.DOWNVOTE_COMMENT_SUCCESS:
      comment[action.comment.id] = {
        ...action.comment,
      };
      newComments = Object.assign({}, state.comments, comment);
      return { comments: newComments, isRequestPending: false };
    case types.FETCH_POST_COMMENTS_SUCCESS:
      newComments = action.comments.reduce((acc, cur) => {
        acc[cur.id] = cur;
        return acc;
      }, {});
      return { comments: newComments, isRequestPending: false };
    default:
      return state;
  }
};

export default comments;
