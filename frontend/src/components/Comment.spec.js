/* eslint "no-undef": 0 */
/* eslint "react/jsx-filename-extension": 0 */
import { expect } from 'chai';
import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

import Comment from './Comment';
import CommentVotingContainer from './CommentVotingContainer';

describe('<Comment />', () => {
  let wrapper;
  let store;

  const now = Date.now();
  const comment = {
    id: '0',
    parentId: '1',
    author: 'me',
    body: 'comment body',
    timestamp: now,
    voteScore: 10,
  };

  beforeEach(() => {
    store = configureMockStore()({});
    wrapper = mount(
      <Provider store={store}>
        <Comment comment={comment} />
      </Provider>,
    );
  });

  it('renders successfully', () => {
    expect(wrapper.length).to.equal(1);
  });

  it('renders <CommentVotingContainer />', () => {
    expect(wrapper.find(CommentVotingContainer).length).to.equal(1);
  });
});
