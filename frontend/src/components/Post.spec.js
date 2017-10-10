/* eslint "no-undef": 0 */
/* eslint "react/jsx-filename-extension": 0 */
import { expect } from 'chai';
import { shallow } from 'enzyme';
import moment from 'moment';
import React from 'react';
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
  const onCancelEdit = sinon.spy();
  const onDelete = sinon.spy();
  const onEdit = sinon.spy();
  const onEditSubmit = sinon.spy();
  const onPostClick = sinon.spy();
  const events = { onCancelEdit, onDelete, onEdit, onEditSubmit, onPostClick };
  let wrapper;

  describe('when `isEditing` prop is true', () => {
    beforeEach(() => {
      const isEditing = true;
      wrapper = shallow(<Post post={post} {...events} isEditing={isEditing} />);
    });

    it('renders successfully', () => {
      expect(wrapper.length).to.equal(1);
    });

    it('renders an editing form', () => {
      expect(wrapper.find('form').length).to.equal(1);
    });

    it('renders a text input', () => {
      expect(wrapper.find('input[type="text"]').length).to.equal(1);
      // has same text as post title initially
      expect(wrapper.find('input[type="text"]').props().value).to.equal(post.title);
    });

    it('renders a textarea', () => {
      expect(wrapper.find('textarea').length).to.equal(1);
      // has same text as post body initally
      expect(wrapper.find('textarea').props().value).to.equal(post.body);
    });

    it('renders cancel and submit changes buttons', () => {
      expect(wrapper.find('button').length).to.equal(2);
    });

    it('calls `onCancelEdit` when cancel button clicked', () => {
      wrapper.find('button.edit-action--cancel').simulate('click');
      expect(onCancelEdit.calledOnce).to.equal(true);
      expect(onCancelEdit.args[0]).to.eql([]);
    });

    it('calls `onEditSubmit` when submit button clicked', () => {
      wrapper.find('button.edit-action--submit').simulate('click');
      expect(onEditSubmit.calledOnce).to.equal(true);
      expect(onEditSubmit.calledWith({ body: post.body, title: post.title })).to.equal(true);
    });
  });

  describe('when `isEditing` prop is false', () => {
    beforeEach(() => {
      wrapper = shallow(<Post post={post} {...events} />);
    });

    it('renders successfully', () => {
      expect(wrapper.length).to.equal(1);
    });

    it('renders a containing div', () => {
      expect(wrapper.find('div').length).to.be.above(0);
    });

    it('renders a delete and an edit actions', () => {
      expect(wrapper.find('span.post-action').length).to.equal(2);
    });

    it('calls `onDelete` when delete clicked', () => {
      wrapper.find('span.post-action--delete').simulate('click');
      expect(onDelete.calledOnce).to.equal(true);
      expect(onDelete.args[0]).to.eql([]);
    });

    it('calls `onEdit` when edit clicked', () => {
      wrapper.find('span.post-action--edit').simulate('click');
      expect(onEdit.calledOnce).to.equal(true);
      expect(onEdit.args[0]).to.eql([]);
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

      it('should contain formatted timestamp', () => {
        expect(postFooterWrapper.text()).to.contain(moment(post.timestamp).fromNow());
      });

      it('should contain vote score', () => {
        expect(postFooterWrapper.text()).to.contain(post.voteScore);
      });

      it('should contain a <PostVotingContainer />', () => {
        expect(postFooterWrapper.find(PostVotingContainer).length).to.equal(1);
      });
    });
  });
});
