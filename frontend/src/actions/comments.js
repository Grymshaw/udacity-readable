/* eslint "no-undef": 0 */
import * as types from '../constants/ActionTypes';

/* SETUP */
const BASE_URL = 'http://localhost:5001/comments';
const HEADERS = {
  Authorization: 'whatever',
  'Content-Type': 'application/json',
};

/* blank_REQUEST */
export const addCommentRequest = () => ({ type: types.ADD_COMMENT_REQUEST });
export const editCommentRequest = () => ({ type: types.EDIT_COMMENT_REQUEST });
export const deleteCommentRequest = () => ({ type: types.DELETE_COMMENT_REQUEST });
export const upvoteCommentRequest = () => ({ type: types.UPVOTE_COMMENT_REQUEST });
export const downvoteCommentRequest = () => ({ type: types.DOWNVOTE_COMMENT_REQUEST });
export const fetchPostCommentsRequest = () => ({ type: types.FETCH_POST_COMMENTS_REQUEST });

/* blank_SUCCESS */
export const addCommentSuccess = comment => ({
  type: types.ADD_COMMENT_SUCCESS,
  comment,
});

export const editCommentSuccess = comment => ({
  type: types.EDIT_COMMENT_SUCCESS,
  comment,
});

export const deleteCommentSuccess = comment => ({
  type: types.DELETE_COMMENT_SUCCESS,
  comment,
});

export const upvoteCommentSuccess = comment => ({
  type: types.UPVOTE_COMMENT_SUCCESS,
  comment,
});

export const downvoteCommentSuccess = comment => ({
  type: types.DOWNVOTE_COMMENT_SUCCESS,
  comment,
});

export const fetchPostCommentsSuccess = comments => ({
  type: types.FETCH_POST_COMMENTS_SUCCESS,
  comments,
});

/* thunk action creators */
export const addComment = comment => (dispatch) => {
  dispatch(addCommentRequest());
  return fetch(BASE_URL, {
    method: 'post',
    headers: HEADERS,
    body: JSON.stringify({ comment }),
  })
    .then(res => res.json())
    .then(json => dispatch(addCommentSuccess(json)));
};

export const editComment = (id, edits) => (dispatch) => {
  dispatch(editCommentRequest());
  return fetch(`${BASE_URL}/${id}`, {
    method: 'put',
    headers: HEADERS,
    body: JSON.stringify(edits),
  })
    .then(res => res.json())
    .then(json => dispatch(editCommentSuccess(json)));
};

export const deleteComment = id => (dispatch) => {
  dispatch(deleteCommentRequest());
  return fetch(`${BASE_URL}/${id}`, {
    method: 'delete',
    headers: HEADERS,
  })
    .then(res => res.json())
    .then(json => dispatch(deleteCommentSuccess(json)));
};

export const upvoteComment = id => (dispatch) => {
  dispatch(upvoteCommentRequest());
  return fetch(`${BASE_URL}/${id}`, {
    method: 'post',
    headers: HEADERS,
    body: JSON.stringify({ option: 'upVote' }),
  })
    .then(res => res.json())
    .then(json => dispatch(upvoteCommentSuccess(json)));
};

export const downvoteComment = id => (dispatch) => {
  dispatch(downvoteCommentRequest());
  return fetch(`${BASE_URL}/${id}`, {
    method: 'post',
    headers: HEADERS,
    body: JSON.stringify({ option: 'downVote' }),
  })
    .then(res => res.json())
    .then(json => dispatch(downvoteCommentSuccess(json)));
};

export const fetchPostComments = parentId => (dispatch) => {
  dispatch(fetchPostCommentsRequest());
  return fetch(`http://localhost:5001/posts/${parentId}/comments`, {
    method: 'get',
    headers: HEADERS,
  })
    .then(res => res.json())
    .then(json => dispatch(fetchPostCommentsSuccess(json)));
};
