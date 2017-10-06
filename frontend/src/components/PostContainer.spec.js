/* eslint "no-undef": 0 */
/* eslint "react/jsx-filename-extension": 0 */
import { expect } from 'chai';
import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import sinon from 'sinon';

import * as types from '../constants/ActionTypes';
import PostContainer from './PostContainer';

describe('<PostContainer />', () => {
  let store;
  let wrapper;

  const post = {
    id: '0',
    body: 'hello post body',
    title: 'post title',
  };

  beforeEach(() => {
    sinon.stub(window, 'fetch');
    const res = new window.Response(
      JSON.stringify(post),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    // need second res for FETCH_ALL_POSTS action
    const res2 = new window.Response(
      JSON.stringify([post]),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const allRes = [res, res2];
    let i = 0;
    window.fetch.returns(Promise.resolve(Promise.resolve(allRes[i++])));

    store = configureMockStore()({ posts: { isEditing: false } });
    wrapper = mount(
      <Provider store={store}>
        <PostContainer post={{ id: '0' }} />
      </Provider>,
    );
  });

  afterEach(() => {
    window.fetch.restore();
  });

  it('renders successfully', () => {
    expect(wrapper.length).to.equal(1);
  });

  describe('rendered <Post />', () => {
    it('renders', () => {
      expect(wrapper.find('Post').length).to.equal(1);
    });

    it('receives `onEdit` in props', () => {
      wrapper.find('Post').first().props().onEdit();
      const expectedActions = [
        { type: types.SET_IS_POST_EDITING, isEditing: true, currentPostEditing: '0' },
      ];
      expect(store.getActions()).to.eql(expectedActions);
    });

    it('receives `onCancelEdit` in props', () => {
      wrapper.find('Post').first().props().onCancelEdit();
      const expectedActions = [
        { type: types.SET_IS_POST_EDITING, isEditing: false, currentPostEditing: null },
      ];
      expect(store.getActions()).to.eql(expectedActions);
    });

    // still don't know how to handle multiple fetch requests without tests crashing...
    // latest attempt shown in beforeEach() above (ie. having mulitple Responses)

    // it('receives `onEditSubmit` in props', () => {
    //   const editedPost = { id: '0', body: 'edited body', title: 'edited title' };
    //   wrapper.find('Post').first().props().onEditSubmit(editedPost);
    //   const expectedActions = [
    //     { type: types.EDIT_POST_REQUEST },
    //     { type: types.EDIT_POST_SUCCESS, post: editedPost },
    //     { type: types.FETCH_ALL_POSTS_REQUEST },
    //     { type: types.FETCH_ALL_POSTS_SUCCESS, posts: [editedPost] },
    //     { type: types.SET_IS_POST_EDITING, isEditing: false, currentPostEditing: null },
    //   ];
    //   expect(store.getActions()).to.eql(expectedActions);
    // });
  });
});
