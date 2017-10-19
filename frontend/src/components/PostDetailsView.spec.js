/* eslint "no-undef": 0 */
/* eslint "react/jsx-filename-extension": 0 */
import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';
import configureMockStore from 'redux-mock-store';

import CommentListContainer from './CommentListContainer';
import NewCommentFormContainer from './NewCommentFormContainer';
import PostDetailsContainer from './PostDetailsContainer';
import PostDetailsView from './PostDetailsView';

describe('<PostDetailsView />', () => {
  describe('when post exists', () => {
    let store;
    let wrapper;

    beforeEach(() => {
      store = configureMockStore()({ posts: { posts: { '0': 'blah' }, isRequestPending: false } });
      wrapper = shallow(
        <PostDetailsView
          store={store}
          match={{ params: { id: '0' } }}
        />);
    });

    it('renders successfully', () => {
      expect(wrapper.length).to.equal(1);
    });

    it('renders a <PostDetailsContainer />', () => {
      expect(wrapper.find(PostDetailsContainer).length).to.equal(1);
    });

    it('renders a <NewCommentFormContainer />', () => {
      expect(wrapper.find(NewCommentFormContainer).length).to.equal(1);
    });

    it('renders a <CommentListContainer />', () => {
      expect(wrapper.find(CommentListContainer).length).to.equal(1);
    });
  });

  describe('when post doesn\'t exist', () => {
    let store;
    let wrapper;

    beforeEach(() => {
      store = configureMockStore()({ posts: { posts: { '0': 'blah' }, isRequestPending: false } });
      wrapper = shallow(
        <PostDetailsView
          store={store}
          match={{ params: { id: '1' } }}
        />);
    });

    it('renders successfully', () => {
      expect(wrapper.length).to.equal(1);
    });

    it('renders a <Redirect />', () => {
      expect(wrapper.find('Redirect').length).to.equal(1);
    });
  });
});
