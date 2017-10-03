/* eslint "no-undef": 0 */
/* eslint "react/jsx-filename-extension": 0 */
import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';
// import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

import CommentListContainer from './CommentListContainer';
import PostDetailsView from './PostDetailsView';
import PostDetailsContainer from './PostDetailsContainer';

describe('<PostDetailsView />', () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = configureMockStore()({
      posts: { currentPost: '0', posts: {}, isRequestPending: false },
    });
    wrapper = shallow(<PostDetailsView match={{ params: { id: '0' } }} />);
  });

  it('renders successfully', () => {
    expect(wrapper.length).to.equal(1);
  });

  it('renders a <PostDetailsContainer />', () => {
    expect(wrapper.find(PostDetailsContainer).length).to.equal(1);
  });

  it('renders a <CommentListContainer />', () => {
    expect(wrapper.find(CommentListContainer).length).to.equal(1);
  });

  // it('sets currentPost of store upon mounting', () => {
  //   expect(store.getActions()).to.deep.include({
  //     type: types.SET_CURRENT_POST,
  //     currentPost: '0',
  //   });
  // });
});
