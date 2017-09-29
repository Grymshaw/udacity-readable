/* eslint "no-undef": 0 */
import { expect } from 'chai';
import deepFreeze from 'deep-freeze';

import * as types from '../constants/ActionTypes';
import posts from './posts';

describe('posts reducer', () => {
  it('should handle default state', () => {
    const initialState = { posts: {}, isRequestPending: false };
    expect(posts(undefined, {})).to.deep.equal(initialState);
  });
  describe('posts reducer <blank>_REQUESTs', () => {
    it('should handle ADD_POST_REQUEST', () => {
      const stateBefore = { posts: {}, isRequestPending: false };
      const action = { type: types.ADD_POST_REQUEST };

      deepFreeze(stateBefore);
      deepFreeze(action);

      expect(posts(stateBefore, action)).to.deep.equal({
        posts: {},
        isRequestPending: true,
      });
    });
    it('should handle EDIT_POST_REQUEST', () => {
      const stateBefore = { posts: {}, isRequestPending: false };
      const action = { type: types.EDIT_POST_REQUEST };

      deepFreeze(stateBefore);
      deepFreeze(action);

      expect(posts(stateBefore, action)).to.deep.equal({
        posts: {},
        isRequestPending: true,
      });
    });
    it('should handle DELETE_POST_REQUEST', () => {
      const stateBefore = { posts: {}, isRequestPending: false };
      const action = { type: types.DELETE_POST_REQUEST };

      deepFreeze(stateBefore);
      deepFreeze(action);

      expect(posts(stateBefore, action)).to.deep.equal({
        posts: {},
        isRequestPending: true,
      });
    });
    it('should handle UPVOTE_POST_REQUEST', () => {
      const stateBefore = { posts: {}, isRequestPending: false };
      const action = { type: types.UPVOTE_POST_REQUEST };

      deepFreeze(stateBefore);
      deepFreeze(action);

      expect(posts(stateBefore, action)).to.deep.equal({
        posts: {},
        isRequestPending: true,
      });
    });
    it('should handle DOWNVOTE_POST_REQUEST', () => {
      const stateBefore = { posts: {}, isRequestPending: false };
      const action = { type: types.DOWNVOTE_POST_REQUEST };

      deepFreeze(stateBefore);
      deepFreeze(action);

      expect(posts(stateBefore, action)).to.deep.equal({
        posts: {},
        isRequestPending: true,
      });
    });
    it('should handle FETCH_CATEGORY_POSTS_REQUEST', () => {
      const stateBefore = { posts: {}, isRequestPending: false };
      const action = { type: types.FETCH_CATEGORY_POSTS_REQUEST };
      deepFreeze(stateBefore);
      deepFreeze(action);
      expect(posts(stateBefore, action)).to.eql({ posts: {}, isRequestPending: true });
    });
    it('should handle FETCH_ALL_POSTS_REQUEST', () => {
      const stateBefore = { posts: {}, isRequestPending: false };
      const action = { type: types.FETCH_ALL_POSTS_REQUEST };
      deepFreeze(stateBefore);
      deepFreeze(action);
      expect(posts(stateBefore, action)).to.eql({ posts: {}, isRequestPending: true });
    });
  });
  describe('posts reducer <blank>_SUCCESSes', () => {
    const currentDate = Date.now();
    it('should handle ADD_POST_SUCCESS', () => {
      const stateBefore = { posts: {}, isRequestPending: true };
      const action = {
        type: types.ADD_POST_SUCCESS,
        post: {
          id: '0',
          author: 'me',
          body: 'new post body',
          timestamp: currentDate,
          deleted: false,
          voteCount: 1,
        },
      };

      deepFreeze(stateBefore);
      deepFreeze(action);

      const stateAfter = {
        posts: {
          0: {
            id: '0',
            author: 'me',
            body: 'new post body',
            timestamp: currentDate,
            deleted: false,
            voteCount: 1,
          },
        },
        isRequestPending: false,
      };
      expect(posts(stateBefore, action)).to.deep.equal(stateAfter);
    });
    it('should handle EDIT_POST_SUCCESS', () => {
      const stateBefore = {
        posts: {
          0: {
            id: '0',
            author: 'me',
            body: 'new post body',
            timestamp: currentDate,
            deleted: false,
            voteCount: 1,
          },
          1: {
            id: '1',
            author: 'not me',
            body: 'second post body',
            timestamp: currentDate + 10,
            deleted: false,
            voteCount: 1,
          },
        },
        isRequestPending: true,
      };
      const editDate = Date.now();
      const action = {
        type: types.EDIT_POST_SUCCESS,
        post: {
          id: '0',
          author: 'me',
          body: 'edited post body',
          timestamp: editDate,
          deleted: false,
          voteCount: 1,
        },
      };

      deepFreeze(stateBefore);
      deepFreeze(action);

      const stateAfter = {
        posts: {
          0: {
            id: '0',
            author: 'me',
            body: 'edited post body',
            timestamp: editDate,
            deleted: false,
            voteCount: 1,
          },
          1: {
            id: '1',
            author: 'not me',
            body: 'second post body',
            timestamp: currentDate + 10,
            deleted: false,
            voteCount: 1,
          },
        },
        isRequestPending: false,
      };
      expect(posts(stateBefore, action)).to.deep.equal(stateAfter);
    });
    it('should handle DELETE_POST_SUCCESS', () => {
      const stateBefore = {
        posts: {
          0: {
            id: '0',
            author: 'me',
            body: 'post body',
            timestamp: currentDate,
            deleted: false,
            voteCount: 1,
          },
        },
        isRequestPending: true,
      };
      const action = {
        type: types.DELETE_POST_SUCCESS,
        post: {
          id: '0',
          author: 'me',
          body: 'post body',
          timestamp: currentDate,
          deleted: true,
          voteCount: 1,
        },
      };

      deepFreeze(stateBefore);
      deepFreeze(action);

      const stateAfter = {
        posts: {
          0: {
            id: '0',
            author: 'me',
            body: 'post body',
            timestamp: currentDate,
            deleted: true,
            voteCount: 1,
          },
        },
        isRequestPending: false,
      };

      expect(posts(stateBefore, action)).to.deep.equal(stateAfter);
    });
    it('should handle UPVOTE_POST_SUCCESS', () => {
      const stateBefore = {
        posts: {
          0: {
            id: '0',
            author: 'me',
            body: 'post body',
            timestamp: currentDate,
            deleted: false,
            voteCount: 1,
          },
        },
        isRequestPending: true,
      };
      const action = {
        type: types.UPVOTE_POST_SUCCESS,
        post: {
          id: '0',
          author: 'me',
          body: 'post body',
          timestamp: currentDate,
          deleted: false,
          voteCount: 2,
        },
      };

      deepFreeze(stateBefore);
      deepFreeze(action);

      const stateAfter = {
        posts: {
          0: {
            id: '0',
            author: 'me',
            body: 'post body',
            timestamp: currentDate,
            deleted: false,
            voteCount: 2,
          },
        },
        isRequestPending: false,
      };
      expect(posts(stateBefore, action)).to.deep.equal(stateAfter);
    });
    it('should handle DOWNVOTE_POST_SUCCESS', () => {
      const stateBefore = {
        posts: {
          0: {
            id: '0',
            author: 'me',
            body: 'post body',
            timestamp: currentDate,
            deleted: false,
            voteCount: 1,
          },
        },
        isRequestPending: true,
      };
      const action = {
        type: types.DOWNVOTE_POST_SUCCESS,
        post: {
          id: '0',
          author: 'me',
          body: 'post body',
          timestamp: currentDate,
          deleted: false,
          voteCount: 0,
        },
      };

      deepFreeze(stateBefore);
      deepFreeze(action);

      const stateAfter = {
        posts: {
          0: {
            id: '0',
            author: 'me',
            body: 'post body',
            timestamp: currentDate,
            deleted: false,
            voteCount: 0,
          },
        },
        isRequestPending: false,
      };
      expect(posts(stateBefore, action)).to.deep.equal(stateAfter);
    });
    it('should handle FETCH_ALL_POSTS_SUCCESS', () => {
      const stateBefore = { posts: {}, isRequestPending: true };
      const action = {
        type: types.FETCH_ALL_POSTS_SUCCESS,
        posts: [{
          author: 'thingtwo',
          body: 'Everyone says so after all.',
          category: 'react',
          deleted: false,
          id: '8xf0y6ziyjabvozdd253nd',
          timestamp: 1467166872634,
          title: 'Udacity is the best place to learn React',
          voteScore: 6,
        }],
      };
      expect(posts(stateBefore, action)).to.eql({
        posts: {
          '8xf0y6ziyjabvozdd253nd': {
            author: 'thingtwo',
            body: 'Everyone says so after all.',
            category: 'react',
            deleted: false,
            id: '8xf0y6ziyjabvozdd253nd',
            timestamp: 1467166872634,
            title: 'Udacity is the best place to learn React',
            voteScore: 6,
          },
        },
        isRequestPending: false,
      });
    });
    it('should handle FETCH_CATEGORY_POSTS_SUCCESS', () => {
      const stateBefore = { posts: {}, isRequestPending: true };
      const action = {
        type: types.FETCH_CATEGORY_POSTS_SUCCESS,
        posts: [{
          author: 'thingtwo',
          body: 'Everyone says so after all.',
          category: 'react',
          deleted: false,
          id: '8xf0y6ziyjabvozdd253nd',
          timestamp: 1467166872634,
          title: 'Udacity is the best place to learn React',
          voteScore: 6,
        }],
      };
      expect(posts(stateBefore, action)).to.eql({
        posts: {
          '8xf0y6ziyjabvozdd253nd': {
            author: 'thingtwo',
            body: 'Everyone says so after all.',
            category: 'react',
            deleted: false,
            id: '8xf0y6ziyjabvozdd253nd',
            timestamp: 1467166872634,
            title: 'Udacity is the best place to learn React',
            voteScore: 6,
          },
        },
        isRequestPending: false,
      });
    });
  });
});

