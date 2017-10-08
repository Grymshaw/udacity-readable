/* eslint "no-undef": 0 */
/* eslint "react/jsx-filename-extension": 0 */
import { expect } from 'chai';
import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import sinon from 'sinon';

import PostDetailsContainer from './PostDetailsContainer';
import * as types from '../constants/ActionTypes';

describe('<PostDetailsContainer />', () => {
  let store;
  let wrapper;
  const posts = {
    0: {
      id: '0',
      author: 'me',
      body: 'hello',
      timestamp: 12345,
      title: 'the title',
      category: 'react',
    },
    1: {
      id: '1',
      author: 'not me',
      body: 'goodbye',
      timestamp: Date.now(),
      title: 'the title',
      category: 'react',
    },
  };

  beforeEach(() => {
    sinon.stub(window, 'fetch');
    const res = new window.Response(
      JSON.stringify(posts),
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
      posts: {
        posts,
        currentPost: posts[0].id,
      },
    });
    wrapper = mount(
      <Provider store={store}>
        <PostDetailsContainer id={'0'} params={{ id: '0' }} />
      </Provider>,
    );
  });

  afterEach(() => {
    window.fetch.restore();
  });

  it('renders successfully', () => {
    expect(wrapper.length).to.equal(1);
  });

  describe('rendered <PostDetails />', () => {
    it('renders', () => {
      expect(wrapper.find('PostDetails').length).to.equal(1);
    });

    it('calls `onMount` props when it mounts', () => {
      const expectedActions = [
        { type: types.FETCH_ALL_POSTS_REQUEST },
        { type: types.FETCH_ALL_POSTS_SUCCESS, posts },
        // { type: types.SET_CURRENT_POST, id: '0' },
      ];
      expect(store.getActions()).to.eql(expectedActions);
      // expect(store.dispatch.callCount).to.equal(expectedActions.length);
      // expect(store.dispatch.calledWith(expectedActions[0])).to.equal(true);
      // expect(store.dispatch.calledWith(expectedActions[1])).to.equal(true);
    });

    it('receives `onEdit` in props', () => {
      wrapper.find('PostDetails').first().props().onEdit('0');
      const expectedActions = [
        { type: types.FETCH_ALL_POSTS_REQUEST },
        { type: types.FETCH_ALL_POSTS_SUCCESS, posts },
        { type: types.SET_IS_POST_EDITING, isEditing: true, currentPostEditing: '0' },
      ];
      expect(store.getActions()).to.eql(expectedActions);
    });

    it('receives `onEditCancel` in props', () => {
      wrapper.find('PostDetails').first().props().onEditCancel();
      const expectedActions = [
        { type: types.FETCH_ALL_POSTS_REQUEST },
        { type: types.FETCH_ALL_POSTS_SUCCESS, posts },
        { type: types.SET_IS_POST_EDITING, isEditing: false, currentPostEditing: null },
      ];
      expect(store.getActions()).to.eql(expectedActions);
    });
  });
});
