/* eslint "no-undef": 0 */
/* eslint "react/jsx-filename-extension": 0 */
import { expect } from 'chai';
import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import sinon from 'sinon';

import CommentListContainer from './CommentListContainer';
import * as types from '../constants/ActionTypes';

describe('<CommentListContainer />', () => {
  let wrapper;
  let store;

  const comments = [
    { id: '0', author: 'me', body: 'body' },
    { id: '1', author: 'notme', body: 'notbody' },
  ];

  beforeEach(() => {
    sinon.stub(window, 'fetch');
    const res = new window.Response(
      JSON.stringify(comments),
      {
        status: 200,
        headers: {
          Authorization: 'whatever',
          'Content-type': 'application/json',
        },
      },
    );
    window.fetch.returns(Promise.resolve(res));

    store = configureMockStore()({
      comments: {
        comments,
      },
      sortOrder: {
        order: 'votesAscending',
      },
    });
    wrapper = mount(
      <Provider store={store}>
        <CommentListContainer parentId={'1'} sortOrder="votesAscending" />
      </Provider>
    );
  });

  afterEach(() => {
    window.fetch.restore();
  });

  it('renders successfully', () => {
    expect(wrapper.length).to.equal(1);
  });

  describe('rendered <CommentList />', () => {
    it('renders', () => {
      expect(wrapper.find('CommentList').length).to.equal(1);
    });

    it('fetches comments on mounting', () => {
      const expectedActions = [
        { type: types.FETCH_POST_COMMENTS_REQUEST },
        { type: types.FETCH_POST_COMMENTS_SUCCESS, comments },
      ];
      expect(store.getActions()).to.eql(expectedActions);
    });
  });
});
