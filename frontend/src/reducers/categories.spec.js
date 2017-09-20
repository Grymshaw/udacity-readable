/* eslint "no-undef": 0 */
import { expect } from 'chai';
import deepFreeze from 'deep-freeze';

import categories from './categories';
import * as types from '../constants/ActionTypes';

describe('categories reducer', () => {
  it('handles default state', () => {
    const result = categories(undefined, {});
    expect(result).to.deep.equal({
      categories: [],
      isRequestPending: false,
    });
  });

  it('handles FETCH_CATEGORIES_REQUEST action', () => {
    const stateBefore = { categories: [], isRequestPending: false };
    const action = { type: types.FETCH_CATEGORIES_REQUEST };

    // prevent mutation of past state and action objects
    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(categories(stateBefore, action)).to.deep.equal({
      categories: [],
      isRequestPending: true,
    });
  });

  it('handles FETCH_CATEGORIES_SUCCESS action', () => {
    const stateBefore = { categories: [], isRequestPending: true };
    const action = { type: types.FETCH_CATEGORIES_SUCCESS, categories: ['react', 'redux'] };

    deepFreeze(stateBefore);
    deepFreeze(action);

    const result = categories(stateBefore, action);
    console.log(stateBefore);
    console.log(result);

    expect(result).to.deep.equal({ categories: ['react', 'redux'], isRequestPending: false });
  });
});
