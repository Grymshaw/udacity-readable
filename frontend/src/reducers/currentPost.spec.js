import { expect } from 'chai';
import deepFreeze from 'deep-freeze';

import currentPost from '../reducers/currentPost';
import * as types from '../constants/ActionTypes';

describe('currentPost recuder', () => {
  it('handles default state', () => {
    expect(currentPost(undefined, {})).to.eql({ currentPost: undefined });
  });

  it('handles SET_CURRENT_POST', () => {
    const stateBefore = {};
    const action = {
      type: types.SET_CURRENT_POST,
      postId: '0',
    };
    deepFreeze(stateBefore);
    deepFreeze(action);
    expect(currentPost(stateBefore, action)).to.eql({ currentPost: '0' });
  });
});
