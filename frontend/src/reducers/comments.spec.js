/* eslint "no-undef": 0 */
import { expect } from 'chai';
import deepFreeze from 'deep-freeze';

import * as types from '../constants/ActionTypes';
import comments from './comments';

describe('comments reducer', () => {
  it('should handle default state', () => {
    const initialState = { comments: {}, isRequestPending: false };
    expect(comments(undefined, {})).to.deep.equal(initialState);
  });
  describe('comments reducer <blank>_REQUESTs', () => {
    it('should handle ADD_COMMENT_REQUEST', () => {
      const stateBefore = { comments: {}, isRequestPending: false };
      const action = { type: types.ADD_COMMENT_REQUEST };

      deepFreeze(stateBefore);
      deepFreeze(action);

      expect(comments(stateBefore, action)).to.deep.equal({
        comments: {},
        isRequestPending: true,
      });
    });
    it('should handle EDIT_COMMENT_REQUEST', () => {
      const stateBefore = { comments: {}, isRequestPending: false };
      const action = { type: types.EDIT_COMMENT_REQUEST };

      deepFreeze(stateBefore);
      deepFreeze(action);

      expect(comments(stateBefore, action)).to.deep.equal({
        comments: {},
        isRequestPending: true,
      });
    });
    it('should handle DELETE_COMMENT_REQUEST', () => {
      const stateBefore = { comments: {}, isRequestPending: false };
      const action = { type: types.DELETE_COMMENT_REQUEST };

      deepFreeze(stateBefore);
      deepFreeze(action);

      expect(comments(stateBefore, action)).to.deep.equal({
        comments: {},
        isRequestPending: true,
      });
    });
    it('should handle UPVOTE_COMMENT_REQUEST', () => {
      const stateBefore = { comments: {}, isRequestPending: false };
      const action = { type: types.UPVOTE_COMMENT_REQUEST };

      deepFreeze(stateBefore);
      deepFreeze(action);

      expect(comments(stateBefore, action)).to.deep.equal({
        comments: {},
        isRequestPending: true,
      });
    });
    it('should handle DOWNVOTE_COMMENT_REQUEST', () => {
      const stateBefore = { comments: {}, isRequestPending: false };
      const action = { type: types.DOWNVOTE_COMMENT_REQUEST };

      deepFreeze(stateBefore);
      deepFreeze(action);

      expect(comments(stateBefore, action)).to.deep.equal({
        comments: {},
        isRequestPending: true,
      });
    });
    it('should handle FETCH_POST_COMMENTS_REQUEST', () => {
      const stateBefore = { comments: {}, isRequestPending: false };
      const action = { type: types.FETCH_POST_COMMENTS_REQUEST };
      deepFreeze(stateBefore);
      deepFreeze(action);
      expect(comments(stateBefore, action)).to.eql({ comments: {}, isRequestPending: true });
    });
  });
  describe('comments reducer <blank>_SUCCESSes', () => {
    const currentDate = Date.now();
    it('should handle ADD_COMMENT_SUCCESS', () => {
      const stateBefore = { comments: {}, isRequestPending: true };
      const action = {
        type: types.ADD_COMMENT_SUCCESS,
        comment: {
          id: '0',
          parentId: '1',
          author: 'me',
          body: 'new comment body',
          timestamp: currentDate,
          deleted: false,
          parentDeleted: false,
          voteCount: 1,
        },
      };
      deepFreeze(stateBefore);
      deepFreeze(action);

      const stateAfter = {
        comments: {
          0: {
            id: '0',
            parentId: '1',
            author: 'me',
            body: 'new comment body',
            timestamp: currentDate,
            deleted: false,
            parentDeleted: false,
            voteCount: 1,
          },
        },
        isRequestPending: false,
      };
      expect(comments(stateBefore, action)).to.deep.equal(stateAfter);
    });
    it('should handle EDIT_COMMENT_SUCCESS', () => {
      const stateBefore = {
        comments: {
          0: {
            id: '0',
            parentId: '1',
            author: 'me',
            body: 'new comment body',
            timestamp: currentDate,
            deleted: false,
            parentDeleted: false,
            voteCount: 1,
          },
          1: {
            id: '1',
            parentId: '1',
            author: 'not me',
            body: 'second comment body',
            timestamp: currentDate + 10,
            deleted: false,
            parentDeleted: false,
            voteCount: 1,
          },
        },
        isRequestPending: true,
      };
      const editDate = Date.now();
      const action = {
        type: types.EDIT_COMMENT_SUCCESS,
        comment: {
          id: '0',
          parentId: '1',
          author: 'me',
          body: 'edited comment body',
          timestamp: editDate,
          deleted: false,
          parentDeleted: false,
          voteCount: 1,
        },
      };

      deepFreeze(stateBefore);
      deepFreeze(action);

      const stateAfter = {
        comments: {
          0: {
            id: '0',
            parentId: '1',
            author: 'me',
            body: 'edited comment body',
            timestamp: editDate,
            deleted: false,
            parentDeleted: false,
            voteCount: 1,
          },
          1: {
            id: '1',
            parentId: '1',
            author: 'not me',
            body: 'second comment body',
            timestamp: currentDate + 10,
            deleted: false,
            parentDeleted: false,
            voteCount: 1,
          },
        },
        isRequestPending: false,
      };
      expect(comments(stateBefore, action)).to.deep.equal(stateAfter);
    });
    it('should handle DELETE_COMMENT_SUCCESS', () => {
      const stateBefore = {
        comments: {
          0: {
            id: '0',
            parentId: '1',
            author: 'me',
            body: 'comment body',
            timestamp: currentDate,
            deleted: false,
            parentDeleted: false,
            voteCount: 1,
          },
        },
        isRequestPending: true,
      };
      const action = {
        type: types.DELETE_COMMENT_SUCCESS,
        comment: {
          id: '0',
          parentId: '1',
          author: 'me',
          body: 'comment body',
          timestamp: currentDate,
          deleted: true,
          parentDeleted: false,
          voteCount: 1,
        },
      };

      deepFreeze(stateBefore);
      deepFreeze(action);

      const stateAfter = {
        comments: {
          0: {
            id: '0',
            parentId: '1',
            author: 'me',
            body: 'comment body',
            timestamp: currentDate,
            deleted: true,
            parentDeleted: false,
            voteCount: 1,
          },
        },
        isRequestPending: false,
      };
      expect(comments(stateBefore, action)).to.deep.equal(stateAfter);
    });
    it('should handle UPVOTE_COMMENT_SUCCESS', () => {
      const stateBefore = {
        comments: {
          0: {
            id: '0',
            parentId: '1',
            author: 'me',
            body: 'comment body',
            timestamp: currentDate,
            deleted: false,
            parentDeleted: false,
            voteCount: 1,
          },
        },
        isRequestPending: true,
      };
      const action = {
        type: types.UPVOTE_COMMENT_SUCCESS,
        comment: {
          id: '0',
          parentId: '1',
          author: 'me',
          body: 'comment body',
          timestamp: currentDate,
          deleted: false,
          parentDeleted: false,
          voteCount: 2,
        },
      };

      deepFreeze(stateBefore);
      deepFreeze(action);

      const stateAfter = {
        comments: {
          0: {
            id: '0',
            parentId: '1',
            author: 'me',
            body: 'comment body',
            timestamp: currentDate,
            deleted: false,
            parentDeleted: false,
            voteCount: 2,
          },
        },
        isRequestPending: false,
      };
      expect(comments(stateBefore, action)).to.deep.equal(stateAfter);
    });
    it('should handle DOWNVOTE_COMMENT_SUCCESS', () => {
      const stateBefore = {
        comments: {
          0: {
            id: '0',
            parentId: '1',
            author: 'me',
            body: 'comment body',
            timestamp: currentDate,
            deleted: false,
            parentDeleted: false,
            voteCount: 1,
          },
        },
        isRequestPending: true,
      };
      const action = {
        type: types.DOWNVOTE_COMMENT_SUCCESS,
        comment: {
          id: '0',
          parentId: '1',
          author: 'me',
          body: 'comment body',
          timestamp: currentDate,
          deleted: false,
          parentDeleted: false,
          voteCount: 0,
        },
      };

      deepFreeze(stateBefore);
      deepFreeze(action);

      const stateAfter = {
        comments: {
          0: {
            id: '0',
            parentId: '1',
            author: 'me',
            body: 'comment body',
            timestamp: currentDate,
            deleted: false,
            parentDeleted: false,
            voteCount: 0,
          },
        },
        isRequestPending: false,
      };
      expect(comments(stateBefore, action)).to.deep.equal(stateAfter);
    });
    it('should handle FETCH_POST_COMMENTS_SUCCESS', () => {
      const json = [
        {
          author: 'thingtwo',
          body: 'Hi there! I am a COMMENT.',
          deleted: false,
          id: '894tuq4ut84ut8v4t8wun89g',
          parentDeleted: false,
          parentId: '8xf0y6ziyjabvozdd253nd',
          timestamp: 1468166872634,
          voteScore: 6,
        },
        {
          author: 'thingone',
          body: 'Comments. Are. Cool.',
          deleted: false,
          id: '8tu4bsun805n8un48ve89',
          parentDeleted: false,
          parentId: '8xf0y6ziyjabvozdd253nd',
          timestamp: 1469479767190,
          voteScore: -5,
        },
      ];
      const stateBefore = { comments: {}, isRequestPending: true };
      const action = { type: types.FETCH_POST_COMMENTS_SUCCESS, comments: json };
      deepFreeze(stateBefore);
      deepFreeze(action);
      const stateAfter = {
        comments: {
          '894tuq4ut84ut8v4t8wun89g': {
            author: 'thingtwo',
            body: 'Hi there! I am a COMMENT.',
            deleted: false,
            id: '894tuq4ut84ut8v4t8wun89g',
            parentDeleted: false,
            parentId: '8xf0y6ziyjabvozdd253nd',
            timestamp: 1468166872634,
            voteScore: 6,
          },
          '8tu4bsun805n8un48ve89': {
            author: 'thingone',
            body: 'Comments. Are. Cool.',
            deleted: false,
            id: '8tu4bsun805n8un48ve89',
            parentDeleted: false,
            parentId: '8xf0y6ziyjabvozdd253nd',
            timestamp: 1469479767190,
            voteScore: -5,
          },
        },
        isRequestPending: false,
      };
      expect(comments(stateBefore, action)).to.eql(stateAfter);
    });
  });
});
