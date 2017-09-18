/* eslint "no-undef": 0 */

import { expect } from 'chai';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as actions from './posts';
import * as types from '../constants/ActionTypes';

describe('post actions', () => {
  it('addPostRequest creates an ADD_POST_REQUEST action', () => {
    expect(actions.addPostRequest()).to.deep.equal({ type: types.ADD_POST_REQUEST });
  });
  it('addPostSuccess creates an ADD_POST_SUCCESS action', () => {
    const currentDate = Date.now();
    const post = {
      id: '0',
      author: 'me',
      body: 'body',
      category: 'react',
      title: 'title',
      timestamp: currentDate,
      deleted: false,
      voteCount: 1,
    };
    expect(actions.addPostSuccess(post)).to.deep.equal({ type: types.ADD_POST_SUCCESS, post });
  });
  it('editPostRequest creates an EDIT_POST_REQUEST action', () => {
    expect(actions.editPostRequest()).to.deep.equal({ type: types.EDIT_POST_REQUEST });
  });
  it('editPostSuccess creates an EDIT_POST_SUCCESS action', () => {
    const currentDate = Date.now();
    const post = {
      id: '0',
      author: 'me',
      body: 'body',
      category: 'react',
      title: 'title',
      timestamp: currentDate,
      deleted: false,
      voteCount: 1,
    };
    expect(actions.editPostSuccess(post)).to.deep.equal({ type: types.EDIT_POST_SUCCESS, post });
  });
  it('deletePostRequest creates an DELETE_POST_REQUEST action', () => {
    expect(actions.deletePostRequest()).to.deep.equal({ type: types.DELETE_POST_REQUEST });
  });
  it('deletePostSuccess creates an DELETE_POST_SUCCESS action', () => {
    const currentDate = Date.now();
    const post = {
      id: '0',
      author: 'me',
      body: 'body',
      category: 'react',
      title: 'title',
      timestamp: currentDate,
      deleted: true,
      voteCount: 1,
    };
    expect(actions.deletePostSuccess(post)).to.deep.equal({
      type: types.DELETE_POST_SUCCESS,
      post,
    });
  });
  it('upvotePostRequest creates an UPVOTE_POST_REQUEST action', () => {
    expect(actions.upvotePostRequest()).to.deep.equal({ type: types.UPVOTE_POST_REQUEST });
  });
  it('upvotePostSuccess creates an UPVOTE_POST_SUCCESS action', () => {
    const currentDate = Date.now();
    const post = {
      id: '0',
      author: 'me',
      body: 'body',
      category: 'react',
      title: 'title',
      timestamp: currentDate,
      deleted: false,
      voteCount: 2,
    };
    expect(actions.upvotePostSuccess(post)).to.deep.equal({
      type: types.UPVOTE_POST_SUCCESS,
      post,
    });
  });
  it('downvotePostRequest creates an DOWNVOTE_POST_REQUEST action', () => {
    expect(actions.downvotePostRequest()).to.deep.equal({ type: types.DOWNVOTE_POST_REQUEST });
  });
  it('downvotePostSuccess creates an DOWNVOTE_POST_SUCCESS action', () => {
    const currentDate = Date.now();
    const post = {
      id: '0',
      author: 'me',
      body: 'body',
      category: 'react',
      title: 'title',
      timestamp: currentDate,
      deleted: false,
      voteCount: 0,
    };
    expect(actions.downvotePostSuccess(post)).to.deep.equal({
      type: types.DOWNVOTE_POST_SUCCESS,
      post,
    });
  });
});

describe('async post actions', () => {
  let middlewares;
  let mockStore;
  let mockResponse;
  beforeEach(() => {
    middlewares = [thunk];
    mockStore = configureMockStore(middlewares);
    mockResponse = (status, statusText, response) => (
      new window.Response(response, {
        status,
        statusText,
        headers: {
          Authorization: 'anything',
          'Content-Type': 'application/json',
        },
      })
    );
  });
  afterEach(() => {
    window.fetch.mockRestore();
  });
  it('creates ADD_POST_SUCCESS when done adding post', () => {
    const currentDate = Date.now();
    const post = {
      id: '0',
      timestamp: currentDate,
      author: 'me',
      body: 'mock body here',
      category: 'react',
      title: 'mock title',
    };
    const response = Object.assign({}, post, { deleted: false, voteScore: 1 });
    window.fetch = jest.fn(() =>
      Promise.resolve(mockResponse(200, null, JSON.stringify(response))));
    const store = mockStore({});
    const expectedActions = [
      { type: types.ADD_POST_REQUEST },
      { type: types.ADD_POST_SUCCESS, post: response },
    ];
    return store.dispatch(actions.addPost(post))
      .then(() => {
        const storeActions = store.getActions();
        expect(storeActions.length).to.equal(2);
        expect(storeActions).to.deep.equal(expectedActions);
      });
  });
  it('creates EDIT_POST_SUCCESS when done editing post', () => {
    const currentDate = Date.now();
    const edits = {
      body: 'edited mock body',
      title: 'edited mock title',
    };
    const response = {
      id: '0',
      author: 'me',
      body: 'edited mock body',
      category: 'react',
      timestamp: currentDate,
      title: 'edited mock title',
      deleted: false,
      voteScore: 1,
    };
    window.fetch = jest.fn(() =>
      Promise.resolve(mockResponse(200, null, JSON.stringify(response))));
    const store = mockStore({});
    const expectedActions = [
      { type: types.EDIT_POST_REQUEST },
      { type: types.EDIT_POST_SUCCESS, post: response },
    ];
    return store.dispatch(actions.editPost('0', edits))
      .then(() => {
        const storeActions = store.getActions();
        expect(storeActions.length).to.equal(2);
        expect(storeActions).to.deep.equal(expectedActions);
      });
  });
  it('creates DELETE_POST_SUCCESS when done deleting post', () => {
    window.fetch = jest.fn(() => Promise.resolve(mockResponse(200, null, JSON.stringify({ post: 'a post' }))));
    const store = mockStore({});
    const expectedActions = [
      { type: types.DELETE_POST_REQUEST },
      { type: types.DELETE_POST_SUCCESS, post: { post: 'a post' } },
    ];
    return store.dispatch(actions.deletePost('0')).then(() => {
      const storeActions = store.getActions();
      expect(storeActions.length).to.equal(2);
      expect(storeActions).to.deep.equal(expectedActions);
    });
  });
  it('creates UPVOTE_POST_SUCCESS when done upvoting post', () => {
    window.fetch = jest.fn(() => Promise.resolve(mockResponse(200, null, JSON.stringify({ post: 'a post' }))));
    const store = mockStore({});
    const expectedActions = [
      { type: types.UPVOTE_POST_REQUEST },
      { type: types.UPVOTE_POST_SUCCESS, post: { post: 'a post' } },
    ];
    return store.dispatch(actions.upvotePost('0')).then(() => {
      const storeActions = store.getActions();
      expect(storeActions.length).to.equal(2);
      expect(storeActions).to.deep.equal(expectedActions);
    });
  });
  it('creates DOWNVOTE_POST_SUCCESS when done downvoting post', () => {
    window.fetch = jest.fn(() => Promise.resolve(mockResponse(200, null, JSON.stringify({ post: 'a post' }))));
    const store = mockStore({});
    const expectedActions = [
      { type: types.DOWNVOTE_POST_REQUEST },
      { type: types.DOWNVOTE_POST_SUCCESS, post: { post: 'a post' } },
    ];
    return store.dispatch(actions.downvotePost('0')).then(() => {
      const storeActions = store.getActions();
      expect(storeActions.length).to.equal(2);
      expect(storeActions).to.deep.equal(expectedActions);
    });
  });

  it('creates FETCH_ALL_POSTS_SUCCESS when done getting all posts', () => {
    window.fetch = jest.fn(() => Promise.resolve(mockResponse(200, null, JSON.stringify(['post 1', 'post 2']))));
    const store = mockStore({});
    const expectedActions = [
      { type: types.FETCH_ALL_POSTS_REQUEST },
      { type: types.FETCH_ALL_POSTS_SUCCESS, posts: ['post 1', 'post 2'] },
    ];
    return store.dispatch(actions.fetchAllPosts()).then(() => {
      const storeActions = store.getActions();
      expect(storeActions.length).to.equal(2);
      expect(storeActions).to.deep.equal(expectedActions);
    });
  });

  it('creates FETCH_POST_COMMENTS_SUCCESS when done getting all posts', () => {
    window.fetch = jest.fn(() => Promise.resolve(mockResponse(200, null, JSON.stringify(['comment 2', 'comment 4']))));
    const store = mockStore({});
    const expectedActions = [
      { type: types.FETCH_POST_COMMENTS_REQUEST },
      { type: types.FETCH_POST_COMMENTS_SUCCESS, comments: ['comment 2', 'comment 4'] },
    ];
    const postId = '2';
    return store.dispatch(actions.fetchPostComments(postId)).then(() => {
      const storeActions = store.getActions();
      expect(storeActions.length).to.equal(2);
      expect(storeActions).to.deep.equal(expectedActions);
    });
  });

  it('creates FETCH_CATEGORY_POSTS_SUCCESS when done getting all posts', () => {
    window.fetch = jest.fn(() => Promise.resolve(mockResponse(200, null, JSON.stringify(['post 2', 'post 4']))));
    const store = mockStore({});
    const expectedActions = [
      { type: types.FETCH_CATEGORY_POSTS_REQUEST },
      { type: types.FETCH_CATEGORY_POSTS_SUCCESS, posts: ['post 2', 'post 4'] },
    ];
    return store.dispatch(actions.fetchCategoryPosts('react')).then(() => {
      const storeActions = store.getActions();
      expect(storeActions.length).to.equal(2);
      expect(storeActions).to.deep.equal(expectedActions);
    });
  });
});
