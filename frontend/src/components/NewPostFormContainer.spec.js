/* eslint "no-undef": 0 */
/* eslint "react/jsx-filename-extension": 0 */
import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';
import configureMockStore from 'redux-mock-store';
import sinon from 'sinon';

import NewPostFormContainer from './NewPostFormContainer';
import * as types from '../constants/ActionTypes';

describe('<NewPostFormContainer />', () => {
  const categories = ['react', 'redux', 'udacity'];
  let store;
  let wrapper;

  beforeEach(() => {
    sinon.stub(window, 'fetch');
    const res = new window.Response(
      JSON.stringify(categories),
      {
        status: 200,
        headers: {
          'Content-Type': 'applcation/json',
        },
      },
    );
    window.fetch.returns(Promise.resolve(res));

    store = configureMockStore()({
      categories: {
        categories,
      },
    });
    wrapper = shallow(<NewPostFormContainer store={store} />);
  });

  afterEach(() => {
    window.fetch.restore();
  });

  it('renders successfully', () => {
    expect(wrapper.length).to.equal(1);
  });

  describe('connected <NewPostForm />', () => {
    it('renders', () => {
      expect(wrapper.find('NewPostForm').length).to.equal(1);
    });

    it('receives `onSubmit` as a prop', () => {
      const post = {
        id: '0',
        author: 'me',
        body: 'hello',
        category: 'react',
        title: 'new post',
        timestamp: Date.now(),
      };
      const expectedActions = [
        { type: types.ADD_POST_REQUEST },
        { type: '@@router/CALL_HISTORY_METHOD', payload: { method: 'push', args: ['/'] } },
        // { type: types.ADD_POST_SUCCESS, post },
      ];
      // TODO: how do you make this not crash when
      // calling with .then and then checking actions?
      wrapper.find('NewPostForm').first().props().onSubmit(post);
      expect(store.getActions()).to.eql(expectedActions);
    });
  });
});
