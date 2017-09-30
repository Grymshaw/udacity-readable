/* eslint "no-undef": 0 */
import { expect } from 'chai';
import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import sinon from 'sinon';
import configureMockStore from 'redux-mock-store';

import * as types from '../constants/ActionTypes';
import PostListContainer from './PostListContainer';

describe('<PostListContainer />', () => {
  const postsResponse = [{
    author: 'thingtwo',
    body: 'Everyone says so after all.',
    category: 'react',
    deleted: false,
    id: '8xf0y6ziyjabvozdd253nd',
    timestamp: 1467166872634,
    title: 'Udacity is the best place to learn React',
    voteScore: 6,
  }];

  let wrapper;
  let store;

  beforeEach(() => {
    sinon.stub(window, 'fetch');
    const res = new window.Response(
      JSON.stringify(postsResponse),
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
        posts: {
          '8xf0y6ziyjabvozdd253nd': {
            author: 'thingtwo',
            body: 'Everyone says so after all.',
            category: 'react',
            deleted: false,
            id: '8xf0y6ziyjabvozdd253nd',
            timestamp: 1467166872634,
            title: 'Udacity is the best place to learn React',
            voteScore: 6,
          },
        },
        isRequestPending: false,
      },
    });
    sinon.spy(store, 'dispatch');
    wrapper = mount(
      <Provider store={store}>
        <PostListContainer />
      </Provider>,
    );
  });

  afterEach(() => {
    window.fetch.restore();
    store.dispatch.restore();
  });

  it('renders successfully', () => {
    expect(wrapper.find(PostListContainer).length).to.equal(1);
  });

  describe('rendered <PostList />', () => {
    let postList;
    beforeEach(() => {
      postList = wrapper.find(PostListContainer).first().find('PostList');
    });

    it('renders', () => {
      expect(postList.length).to.equal(1);
    });

    it('receives `posts` in props', () => {
      expect(postList.first().props().posts).to.eql([{
        author: 'thingtwo',
        body: 'Everyone says so after all.',
        category: 'react',
        deleted: false,
        id: '8xf0y6ziyjabvozdd253nd',
        timestamp: 1467166872634,
        title: 'Udacity is the best place to learn React',
        voteScore: 6,
      }]);
    });

    it('receives `onMount` in props', () => {
      // onMount called when <PostList /> mounts
      expect(store.dispatch.callCount).to.be.above(0);
      expect(store.dispatch.calledWith({ type: types.FETCH_ALL_POSTS_REQUEST })).to.equal(true);
    });
  });
});
