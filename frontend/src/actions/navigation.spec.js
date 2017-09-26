/* eslint "no-undef": 0 */
import { expect } from 'chai';

import * as actions from './navigation';
import * as types from '../constants/ActionTypes';

describe('addNewPost()', () => {
  it('returns an ADD_NEW_POST aciton', () => {
    expect(actions.addNewPost()).to.deep.equal({ type: types.ADD_NEW_POST });
  });
});

describe('changeCategory()', () => {
  it('returns a CHANGE_CATEGORY action', () => {
    expect(actions.changeCategory('react')).to.deep.equal({ type: types.CHANGE_CATEGORY, category: 'react' });
  });
});
