/* eslint "no-undef": 0 */
import { expect } from 'chai';
import * as actions from './sortOrder';
import * as types from '../constants/ActionTypes';

describe('sortOrder actions', () => {
  it('setSortOrder creates SET_SORT_ORDER action', () => {
    expect(actions.setSortOrder('votesAscending')).to.eql({
      type: types.SET_SORT_ORDER,
      sortOrder: 'votesAscending',
    });
  });
});
