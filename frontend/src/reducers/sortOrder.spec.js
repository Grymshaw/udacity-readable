/* eslint "no-undef": 0 */
import { expect } from 'chai';
import deepFreeze from 'deep-freeze';

import sortOrder from './sortOrder';
import * as types from '../constants/ActionTypes';

describe('sortOrder reducer', () => {
  it('handles default state', () => {
    expect(sortOrder(undefined, {})).to.eql({ order: 'votesDescending' });
  });

  it('handles SET_SORT_ORDER action', () => {
    const stateBefore = { order: 'recentFirst' };
    const action = { type: types.SET_SORT_ORDER, sortOrder: 'votesAscending' };

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(sortOrder(stateBefore, action)).to.eql({ order: 'votesAscending' });
  });
});
