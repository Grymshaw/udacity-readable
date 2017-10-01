import { expect } from 'chai';

import * as actions from './currentPost';
import * as types from '../constants/ActionTypes';

describe('currentPost actions', () => {
  it('returns SET_CURRENT_POST action', () => {
    expect(actions.setCurrentPost('0')).to.eql({ type: types.SET_CURRENT_POST, postId: '0' });
  });
});
