/* eslint "no-undef": 0 */
import { expect } from 'chai';
import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import sinon from 'sinon';

import Post from './Post';
import PostVotingContainer from './PostVotingContainer';

const time = Date.now();
const post = {
  id: '0',
  author: 'me',
  body: 'post body',
  category: 'react',
  timestamp: time,
  title: 'post title',
  voteScore: 10,
};

describe('<Post />', () => {
  let onPostClick;
  let store;
  let wrapper;
  beforeEach(() => {
    onPostClick = sinon.spy();
    store = configureMockStore()({});
    wrapper = mount(
      <Provider store={store}>
        <Post
          post={post}
          onPostClick={onPostClick}
        />
      </Provider>)
      .find(Post)
      .first();
  });


  it('renders successfully', () => {
    expect(wrapper.length).to.equal(1);
  });

  it('renders a containing div', () => {
    expect(wrapper.find('div').length).to.be.above(0);
  });

  describe('rendered .post-title', () => {
    let postTitleWrapper;
    beforeEach(() => {
      postTitleWrapper = wrapper.find('.post-title');
    });

    it('renders', () => {
      expect(postTitleWrapper.length).to.equal(1);
    });

    it('.post-title should contain title of post', () => {
      expect(postTitleWrapper.text()).to.equal(post.title);
    });

    it('calls `onPostClick` when is clicked', () => {
      postTitleWrapper.simulate('click');
      expect(onPostClick.calledOnce).to.equal(true);
    });
  });

  describe('rendered .post-footer', () => {
    let postFooterWrapper;
    beforeEach(() => {
      postFooterWrapper = wrapper.find('.post-footer');
    });

    it('renders', () => {
      expect(postFooterWrapper.length).to.equal(1);
    });

    it('should contain author name', () => {
      expect(postFooterWrapper.text()).to.contain(post.author);
    });

    it('should contain category', () => {
      expect(postFooterWrapper.text()).to.contain(post.category);
    });

    it('should contain timestamp', () => {
      expect(postFooterWrapper.text()).to.contain(post.timestamp);
    });

    it('should contain vote score', () => {
      expect(postFooterWrapper.text()).to.contain(post.voteScore);
    });

    it('should contain a <PostVotingContainer />', () => {
      expect(postFooterWrapper.find(PostVotingContainer).length).to.equal(1);
    });
  });
});
