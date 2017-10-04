/* eslint "no-undef": 0 */
/* eslint "react/jsx-filename-extension": 0 */
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
    // sinon.spy(store, 'dispatch');
    wrapper = mount(
      <Provider store={store}>
        <PostListContainer />
      </Provider>,
    );
  });

  afterEach(() => {
    window.fetch.restore();
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
      expect(postList.first().props().posts).to.eql(postsResponse);
    });

    it('receives `onMount` in props', () => {
      // onMount called when <PostList /> mounts
      expect(store.getActions()).to.deep.include({ type: types.FETCH_ALL_POSTS_REQUEST });
    });

    it('when passed `category` prop calls fetchCategory action creator', () => {
      // have to re-initialize response/fetch b/c component mounts twice
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
      // also must re-initialize store
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
      wrapper = mount(
        <Provider store={store}>
          <PostListContainer category={'react'} />
        </Provider>,
      );
      // TODO: still can't find a way to check _SUCCESS without tests crashing
      const expectedActions = [
        { type: types.FETCH_CATEGORY_POSTS_REQUEST },
        // { type: types.FETCH_CATEGORY_POSTS_SUCCESS, postsResponse },
      ];
      expect(store.getActions()).to.eql(expectedActions);
    });

    it('receives `onPostClick` in props', () => {
      postList.first().props().onPostClick('0');
      const expectedActions = [
        { type: '@@router/CALL_HISTORY_METHOD', payload: { method: 'push', args: ['/posts/0'] } },
        { type: types.SET_CURRENT_POST, postId: '0' },
      ];
      expect(store.getActions()).to.deep.include(expectedActions[0]);
      expect(store.getActions()).to.deep.include(expectedActions[1]);
    });
  });
});
