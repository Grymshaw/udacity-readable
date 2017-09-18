/* eslint "no-undef": 0 */

import { expect } from 'chai';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as actions from './comments';
import * as types from '../constants/ActionTypes';

describe('comment actions', () => {
  let comment;
  let currentDate;

  beforeEach(() => {
    currentDate = Date.now();
    comment = {
      id: '0',
      parentId: '1',
      author: 'me',
      body: 'body',
      timestamp: currentDate,
      deleted: false,
      voteCount: 1,
    };
  });

  it('addCommentRequest creates an ADD_COMMENT_REQUEST action', () => {
    expect(actions.addCommentRequest()).to.deep.equal({ type: types.ADD_COMMENT_REQUEST });
  });

  it('addCommentSuccess creates an ADD_COMMENT_SUCCESS action', () => {
    expect(actions.addCommentSuccess(comment)).to.deep.equal({
      type: types.ADD_COMMENT_SUCCESS,
      comment,
    });
  });

  it('editCommentRequest creates an EDIT_COMMENT_REQUEST action', () => {
    expect(actions.editCommentRequest()).to.deep.equal({ type: types.EDIT_COMMENT_REQUEST });
  });

  it('editCommentSuccess creates an EDIT_COMMENT_SUCCESS action', () => {
    expect(actions.editCommentSuccess(comment)).to.deep.equal({
      type: types.EDIT_COMMENT_SUCCESS,
      comment,
    });
  });

  it('deleteCommentRequest creates an DELETE_COMMENT_REQUEST action', () => {
    expect(actions.deleteCommentRequest()).to.deep.equal({ type: types.DELETE_COMMENT_REQUEST });
  });

  it('deleteCommentSuccess creates an DELETE_COMMENT_SUCCESS action', () => {
    comment.deleted = true;
    expect(actions.deleteCommentSuccess(comment)).to.deep.equal({
      type: types.DELETE_COMMENT_SUCCESS,
      comment,
    });
  });

  it('upvoteCommentRequest creates an UPVOTE_COMMENT_REQUEST action', () => {
    expect(actions.upvoteCommentRequest()).to.deep.equal({ type: types.UPVOTE_COMMENT_REQUEST });
  });

  it('upvoteCommentSuccess creates an UPVOTE_COMMENT_SUCCESS action', () => {
    expect(actions.upvoteCommentSuccess(comment)).to.deep.equal({
      type: types.UPVOTE_COMMENT_SUCCESS,
      comment,
    });
  });
  it('downvoteCommentRequest creates an DOWNVOTE_COMMENT_REQUEST action', () => {
    expect(actions.downvoteCommentRequest()).to.deep.equal({
      type: types.DOWNVOTE_COMMENT_REQUEST,
    });
  });
  it('downvoteCommentSuccess creates an DOWNVOTE_COMMENT_SUCCESS action', () => {
    expect(actions.downvoteCommentSuccess(comment)).to.deep.equal({
      type: types.DOWNVOTE_COMMENT_SUCCESS,
      comment,
    });
  });
});

describe('async comment actions', () => {
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
  it('creates ADD_COMMENT_SUCCESS when done adding comment', () => {
    const currentDate = Date.now();
    const comment = {
      id: '0',
      parentId: '1',
      timestamp: currentDate,
      author: 'me',
      body: 'mock body here',
    };
    const response = Object.assign({}, comment, { deleted: false, voteScore: 1 });
    window.fetch = jest.fn(() =>
      Promise.resolve(mockResponse(200, null, JSON.stringify(response))));
    const store = mockStore({});
    const expectedActions = [
      { type: types.ADD_COMMENT_REQUEST },
      { type: types.ADD_COMMENT_SUCCESS, comment: response },
    ];
    return store.dispatch(actions.addComment(comment))
      .then(() => {
        const storeActions = store.getActions();
        expect(storeActions.length).to.equal(2);
        expect(storeActions).to.deep.equal(expectedActions);
      });
  });
  it('creates EDIT_COMMENT_SUCCESS when done editing comment', () => {
    const currentDate = Date.now();
    const edits = {
      body: 'edited mock body',
      timestamp: currentDate,
    };
    const response = {
      id: '0',
      parentId: '1',
      author: 'me',
      body: 'edited mock body',
      timestamp: currentDate,
      deleted: false,
      voteScore: 1,
    };
    window.fetch = jest.fn(() =>
      Promise.resolve(mockResponse(200, null, JSON.stringify(response))));
    const store = mockStore({});
    const expectedActions = [
      { type: types.EDIT_COMMENT_REQUEST },
      { type: types.EDIT_COMMENT_SUCCESS, comment: response },
    ];
    return store.dispatch(actions.editComment('0', edits))
      .then(() => {
        const storeActions = store.getActions();
        expect(storeActions.length).to.equal(2);
        expect(storeActions).to.deep.equal(expectedActions);
      });
  });
  it('creates DELETE_COMMENT_SUCCESS when done deleting comment', () => {
    window.fetch = jest.fn(() =>
      Promise.resolve(mockResponse(200, null, JSON.stringify({ comment: 'a comment' }))),
    );
    const store = mockStore({});
    const expectedActions = [
      { type: types.DELETE_COMMENT_REQUEST },
      { type: types.DELETE_COMMENT_SUCCESS, comment: { comment: 'a comment' } },
    ];
    return store.dispatch(actions.deleteComment('0')).then(() => {
      const storeActions = store.getActions();
      expect(storeActions.length).to.equal(2);
      expect(storeActions).to.deep.equal(expectedActions);
    });
  });
  it('creates UPVOTE_COMMENT_SUCCESS when done upvoting comment', () => {
    window.fetch = jest.fn(() =>
      Promise.resolve(mockResponse(200, null, JSON.stringify({ comment: 'a comment' }))),
    );
    const store = mockStore({});
    const expectedActions = [
      { type: types.UPVOTE_COMMENT_REQUEST },
      { type: types.UPVOTE_COMMENT_SUCCESS, comment: { comment: 'a comment' } },
    ];
    return store.dispatch(actions.upvoteComment('0')).then(() => {
      const storeActions = store.getActions();
      expect(storeActions.length).to.equal(2);
      expect(storeActions).to.deep.equal(expectedActions);
    });
  });
  it('creates DOWNVOTE_COMMENT_SUCCESS when done downvoting comment', () => {
    window.fetch = jest.fn(() =>
      Promise.resolve(mockResponse(200, null, JSON.stringify({ comment: 'a comment' }))),
    );
    const store = mockStore({});
    const expectedActions = [
      { type: types.DOWNVOTE_COMMENT_REQUEST },
      { type: types.DOWNVOTE_COMMENT_SUCCESS, comment: { comment: 'a comment' } },
    ];
    return store.dispatch(actions.downvoteComment('0')).then(() => {
      const storeActions = store.getActions();
      expect(storeActions.length).to.equal(2);
      expect(storeActions).to.deep.equal(expectedActions);
    });
  });
});


// describe('comment actions', () => {
//   it('addComment should create ADD_COMMENT action', () => {
//     const currentDate = Date.now();
//     const comment = {
//       author: 'Me',
//       body: 'Sample comment body',
//       parentId: '1',
//       timestamp: currentDate,
//     };
//     const expectedAction = {
//       type: types.ADD_COMMENT,
//       author: 'Me',
//       body: 'Sample comment body',
//       id: '0',
//       parentId: '1',
//       timestamp: currentDate,
//     };
//     expect(actions.addComment(comment)).to.deep.equal(expectedAction);
//   });

//   it('editComment should create EDIT_COMMENT action', () => {
//     const currentDate = Date.now();
//     const comment = {
//       timestamp: currentDate,
//       body: 'A new edited comment body',
//     };
//     const expectedAction = {
//       type: types.EDIT_COMMENT,
//       body: 'A new edited comment body',
//       id: '0',
//       timestamp: currentDate,
//     };
//     expect(actions.editComment('0', comment)).to.deep.equal(expectedAction);
//   });

//   it('deleteComment should create DELETE_COMMENT action', () => {
//     expect(actions.deleteComment('0')).to.deep.equal({
//       type: types.DELETE_COMMENT,
//       id: '0',
//     });
//   });

//   it('upvoteComment should create UPVOTE_COMMENT action', () => {
//     expect(actions.upvoteComment('0')).to.deep.equal({ type: types.UPVOTE_COMMENT, id: '0' });
//   });

//   it('downvoteComment should create DOWNVOTE_COMMENT action', () => {
//     expect(actions.downvoteComment('0')).to.deep.equal({
//      type: types.DOWNVOTE_COMMENT, id: '0' });
//   });

//   it('fetchPostCommentsRequest should create FETCH_POST_COMMENTS_REQUEST action', () => {
//     expect(actions.fetchPostCommentsRequest('0')).to.deep.equal({
//       type: types.FETCH_POST_COMMENTS_REQUEST,
//       id: '0',
//     });
//   });
// });

// describe('async comment actions', () => {
//   let middlewares;
//   let mockStore;
//   let mockResponse;

//   beforeEach(() => {
//     middlewares = [thunk];
//     mockStore = configureMockStore(middlewares);
//     mockResponse = (status, statusText, response) => (
//       new window.Response(response, {
//         status,
//         statusText,
//         headers: {
//           Authorization: 'anything',
//           'Content-Type': 'applciation/json',
//         },
//       })
//     );
//   });

//   afterEach(() => {
//     window.fetch.mockRestore();
//   });

//   it('creates ADD_POST_SUCCESS when post has successfully added', () => {
//   });

//   it('creates FETCH_POST_COMMENTS_SUCCESS when fetching posts has completed', () => {
//     window.fetch = jest.fn().mockImplementation(() => (
//       Promise.resolve(mockResponse(200, null, '{ "comments": { "id": "0" } }'))
//     ));
//     const store = mockStore({});
//     return store.dispatch(actions.fetchPostComments())
//       .then(() => {
//         const expectedActions = store.getActions();
//         expect(expectedActions.length).to.equal(2);
//         expect(expectedActions).to.include(types.FETCH_COMMENTS_REQUEST);
//         expect(expectedActions).to.include(types.FETCH_COMMENTS_SUCCESS);
//       });
//   });
// });
