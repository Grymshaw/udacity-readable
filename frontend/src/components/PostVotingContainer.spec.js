/* eslint "no-undef": 0 */
/* eslint "react/jsx-filename-extension": 0 */
import { expect } from 'chai';
import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import sinon from 'sinon';

import PostVotingContainer from './PostVotingContainer';
import * as types from '../constants/ActionTypes';

const post = {
  id: '0',
  author: 'post author',
  body: 'post body',
};

describe('<PostVotingContainer />', () => {
  let wrapper;
  let store;

  beforeEach(() => {
    sinon.stub(window, 'fetch');
    const res = new window.Response(
      JSON.stringify(post),
      {
        status: 200,
        headers: {
          Authorization: 'whatever',
          'Content-type': 'application/json',
        },
      },
    );
    window.fetch.returns(Promise.resolve(res));

    store = configureMockStore()({});
    sinon.spy(store, 'dispatch');
    wrapper = mount(
      <Provider store={store}>
        <PostVotingContainer postId={post.id} />
      </Provider>);
  });

  afterEach(() => {
    window.fetch.restore();
    store.dispatch.restore();
  });

  it('renders successfully', () => {
    expect(wrapper.length).to.equal(1);
  });

  describe('rendered <VotingActions />', () => {
    let votingActionsWrapper;
    beforeEach(() => {
      votingActionsWrapper = wrapper.find(PostVotingContainer).first().find('VotingActions').first();
    });

    it('renders', () => {
      expect(votingActionsWrapper.length).to.equal(1);
    });

    it('passes `onUpvote` as prop to <VotingActions />', () => {
      votingActionsWrapper.props().onUpvote();
      expect(store.dispatch.callCount).to.be.above(0);
      expect(store.dispatch.calledWith({ type: types.UPVOTE_POST_REQUEST })).to.equal(true);
      // expect(store.dispatch.calledWith({
      //   type: types.UPVOTE_POST_SUCCESS,
      //   post,
      // })).to.equal(true);
    });

    it('passes `onDownvote` as prop to <VotingActions />', () => {
      votingActionsWrapper.props().onDownvote();
      expect(store.dispatch.callCount).to.be.above(0);
      expect(store.dispatch.calledWith({ type: types.DOWNVOTE_POST_REQUEST })).to.equal(true);
      // expect(store.dispatch.calledWith()).to.eql({ type: types.DOWNVOTE_POST_SUCCESS, id: '0' });
    });
  });
});
