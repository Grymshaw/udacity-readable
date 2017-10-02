/* eslint "no-undef": 0 */
import 'whatwg-fetch';
import * as types from '../constants/ActionTypes';

// *** SETUP ***
const BASE_URL = 'http://localhost:5001/posts';
const HEADERS = {
  Authorization: 'whatever',
  'Content-Type': 'application/json',
};

// *** blank_REQUEST *** //
export const addPostRequest = () => ({ type: types.ADD_POST_REQUEST });
export const editPostRequest = () => ({ type: types.EDIT_POST_REQUEST });
export const deletePostRequest = () => ({ type: types.DELETE_POST_REQUEST });
export const upvotePostRequest = () => ({ type: types.UPVOTE_POST_REQUEST });
export const downvotePostRequest = () => ({ type: types.DOWNVOTE_POST_REQUEST });
export const fetchAllPostsRequest = () => ({ type: types.FETCH_ALL_POSTS_REQUEST });
export const fetchCategoryPostsRequest = () => ({ type: types.FETCH_CATEGORY_POSTS_REQUEST });
export const fetchPostRequest = () => ({ type: types.FETCH_POST_REQUEST });
export const setCurrentPost = id => ({ type: types.SET_CURRENT_POST, id });

// *** blank_SUCCESS *** //
export const addPostSuccess = post => ({
  type: types.ADD_POST_SUCCESS,
  post,
});

export const editPostSuccess = post => ({
  type: types.EDIT_POST_SUCCESS,
  post,
});

export const deletePostSuccess = post => ({
  type: types.DELETE_POST_SUCCESS,
  post,
});
export const upvotePostSuccess = post => ({
  type: types.UPVOTE_POST_SUCCESS,
  post,
});
export const downvotePostSuccess = post => ({
  type: types.DOWNVOTE_POST_SUCCESS,
  post,
});

export const fetchAllPostsSuccess = posts => ({
  type: types.FETCH_ALL_POSTS_SUCCESS,
  posts,
});

export const fetchPostSuccess = post => ({
  type: types.FETCH_POST_SUCCESS,
  post,
});

export const fetchCategoryPostsSuccess = posts => ({
  type: types.FETCH_CATEGORY_POSTS_SUCCESS,
  posts,
});

// *** thunk action creators *** //
export const addPost = post => (dispatch) => {
  dispatch(addPostRequest());
  return fetch(BASE_URL, {
    method: 'post',
    headers: HEADERS,
    body: JSON.stringify(post),
  })
    .then(res => res.json())
    .then(json => dispatch(addPostSuccess(json)));
};

export const editPost = (id, edits) => (dispatch) => {
  dispatch(editPostRequest());
  return fetch(`${BASE_URL}/${id}`, {
    method: 'put',
    headers: HEADERS,
    body: JSON.stringify(edits),
  })
    .then(res => res.json())
    .then(json => dispatch(editPostSuccess(json)));
};

export const deletePost = id => (dispatch) => {
  dispatch(deletePostRequest());
  return fetch(`${BASE_URL}/${id}`, {
    method: 'delete',
    headers: HEADERS,
  })
    .then(res => res.json())
    .then(json => dispatch(deletePostSuccess(json)));
};

export const upvotePost = id => (dispatch) => {
  dispatch(upvotePostRequest());
  return fetch(`${BASE_URL}/${id}`, {
    method: 'post',
    headers: HEADERS,
    body: JSON.stringify({ option: 'upVote' }),
  })
    .then(res => res.json())
    .then(json => dispatch(upvotePostSuccess(json)));
};
export const downvotePost = id => (dispatch) => {
  dispatch(downvotePostRequest());
  return fetch(`${BASE_URL}/${id}`, {
    method: 'post',
    headers: HEADERS,
    body: JSON.stringify({ option: 'downVote' }),
  })
    .then(res => res.json())
    .then(json => dispatch(downvotePostSuccess(json)));
};


export const fetchAllPosts = () => (dispatch) => {
  dispatch(fetchAllPostsRequest());
  return fetch(BASE_URL, {
    method: 'get',
    headers: HEADERS,
  })
    .then(res => res.json())
    .then(json => dispatch(fetchAllPostsSuccess(json)));
};

export const fetchCategoryPosts = category => (dispatch) => {
  dispatch(fetchCategoryPostsRequest());
  return fetch(`http://localhost:5001/${category}/posts`, {
    method: 'get',
    headers: HEADERS,
  })
    .then(res => res.json())
    .then(json => dispatch(fetchCategoryPostsSuccess(json)));
};

export const fetchPost = id => (dispatch) => {
  dispatch(fetchPostRequest());
  return fetch(`${BASE_URL}/${id}`, {
    method: 'get',
    headers: HEADERS,
  }).then(res => res.json())
    .then(json => dispatch(fetchPostSuccess(json)));
};
