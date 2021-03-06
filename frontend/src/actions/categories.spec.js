/* eslint "no-undef": 0 */

import { expect } from 'chai';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as actions from './categories';
import * as types from '../constants/ActionTypes';

describe('categories actions', () => {
  it('fetchCategoriesRequest should create FETCH_CATEGORIES_REQUEST action', () => {
    expect(actions.fetchCategoriesRequest()).to.deep.equal({
      type: types.FETCH_CATEGORIES_REQUEST,
    });
  });
});

describe('async categories actions', () => {
  let middlewares;
  let mockStore;
  let mockResponse;

  const categoriesResponse = {
    categories: [
      { name: 'react', path: 'react' },
      { name: 'redux', path: 'redux' },
      { name: 'udacity', path: 'udacity' },
    ],
  };

  beforeEach(() => {
    middlewares = [thunk];
    mockStore = configureStore(middlewares);
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

  it('creates FETCH_CATEGORIES_SUCCESS when fetching categories has completed', () => {
    window.fetch = jest.fn(() =>
      Promise.resolve(mockResponse(200, null, JSON.stringify(categoriesResponse))));

    const store = mockStore({});
    const expectedActions = [
      { type: types.FETCH_CATEGORIES_REQUEST },
      { type: types.FETCH_CATEGORIES_SUCCESS,
        categories: [
          { name: 'react', value: 'react' },
          { name: 'redux', value: 'redux' },
          { name: 'udacity', value: 'udacity' },
        ],
      },
    ];

    return store.dispatch(actions.fetchAllCategories()).then(() => {
      const storeActions = store.getActions();
      expect(storeActions.length).to.equal(2);
      expect(storeActions).to.deep.equal(expectedActions);
    });
  });
});
