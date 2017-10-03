/* eslint "no-undef": 0 */
/* eslint "react/jsx-filename-extension": 0 */
import { expect } from 'chai';
import { mount } from 'enzyme';
import React from 'react';
import configureMockStore from 'redux-mock-store';
import sinon from 'sinon';

import * as types from '../constants/ActionTypes';
import CommentVotingContainer from './CommentVotingContainer';

describe('CommentVotingContainer', () => {
  let wrapper;
  let store;

  const post = {
    id: '0',
    voteScore: 10,
    author: 'me',
    body: 'hello',
    category: 'react',
  };

  beforeEach(() => {
    sinon.stub(window, 'fetch');
    const res = new window.Response(
      JSON.stringify(post),
      {
        status: 200,
        headers: {
          Authorization: 'whatver',
          'Content-type': 'application/json',
        },
      },
    );
    window.fetch.returns(Promise.resolve(res));

    store = configureMockStore()({});
    wrapper = mount(<CommentVotingContainer store={store} />);
  });

  afterEach(() => {
    window.fetch.restore();
  });

  it('renders successfully', () => {
    expect(wrapper.length).to.equal(1);
  });

  describe('rendered <VotingActions />', () => {
    it('renders', () => {
      expect(wrapper.find('VotingActions').length).to.equal(1);
    });
    it('onUpvote dispatches UPVOTE_COMMENT actions', () => {
      wrapper.find('VotingActions').first().props().onUpvote('0');
      const expectedActions = [
        { type: types.UPVOTE_COMMENT_REQUEST },
      ];
      expect(store.getActions()).to.eql(expectedActions);
    });
    it('onDownvote dispatches DOWNVOTE_COMMENT actions', () => {
      wrapper.find('VotingActions').first().props().onDownvote('0');
      const expectedActions = [
        { type: types.DOWNVOTE_COMMENT_REQUEST },
      ];
      expect(store.getActions()).to.eql(expectedActions);
    });
  });
});
