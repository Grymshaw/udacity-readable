/* eslint "no-undef": 0 */
/* eslint "react/jsx-filename-extension": 0 */
import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';

import PostDetails from './PostDetails';
import PostVotingContainer from './PostVotingContainer';

describe('<PostDetails />', () => {
  const post = {
    id: '0',
    author: 'me',
    body: 'hello this is a post',
    title: 'this is the title',
    timestamp: Date.now(),
  };

  let actions;
  let onDelete;
  let onEditCancel;
  let onEdit;
  let onEditSubmit;
  let wrapper;

  describe('when `isEditing` is true', () => {
    const isEditing = true;

    beforeEach(() => {
      onDelete = sinon.spy();
      onEditCancel = sinon.spy();
      onEdit = sinon.spy();
      onEditSubmit = sinon.spy();
      actions = { onDelete, onEditCancel, onEdit, onEditSubmit };
      wrapper = shallow(<PostDetails post={post} isEditing={isEditing} {...actions} />);
    });

    it('renders successfully', () => {
      expect(wrapper.length).to.equal(1);
    });

    it('renders a form', () => {
      expect(wrapper.find('form').length).to.equal(1);
    });

    it('renders a text input with title pre-populated', () => {
      expect(wrapper.find('input[type="text"]').length).to.equal(1);
      expect(wrapper.find('input[type="text"]').props().value).to.equal(post.title);
    });

    it('renders a textarea with body pre-populated', () => {
      expect(wrapper.find('textarea').length).to.equal(1);
      expect(wrapper.find('textarea').props().value).to.equal(post.body);
    });

    it('renders a button that calls onEditCancel', () => {
      expect(wrapper.find('button.edit-action--cancel').length).to.equal(1);
      wrapper.find('button.edit-action--cancel').simulate('click');
      expect(onEditCancel.calledOnce).to.equal(true);
      expect(onEditCancel.args[0]).to.eql([]);
    });

    it('renders a button that calls onEditSubmit', () => {
      expect(wrapper.find('button.edit-action--submit').length).to.equal(1);
      wrapper.find('button.edit-action--submit').simulate('click');
      expect(onEditSubmit.calledOnce).to.equal(true);
      expect(onEditSubmit.calledWith({ body: post.body, title: post.title })).to.equal(true);
    });
  });

  describe('when `isEditing` is false', () => {
    beforeEach(() => {
      onDelete = sinon.spy();
      onEditCancel = sinon.spy();
      onEdit = sinon.spy();
      onEditSubmit = sinon.spy();
      actions = { onDelete, onEditCancel, onEdit, onEditSubmit };
      wrapper = shallow(<PostDetails post={post} {...actions} />);
    });

    it('renders successfully', () => {
      expect(wrapper.length).to.equal(1);
    });

    it('includes a wrapping div', () => {
      expect(wrapper.find('div').length).to.be.above(0);
    });

    it('includes .post-title', () => {
      expect(wrapper.find('.post-title').length).to.equal(1);
    });

    it('includes .post-subtitle', () => {
      expect(wrapper.find('.post-subtitle').length).to.equal(1);
    });

    it('includes .post-body', () => {
      expect(wrapper.find('.post-body').length).to.equal(1);
    });

    it('includes `PostVotingContainer`', () => {
      expect(wrapper.find(PostVotingContainer).length).to.equal(1);
    });

    it('renders a span that calls `onEdit` on click', () => {
      expect(wrapper.find('span.post-action--edit').length).to.equal(1);
      wrapper.find('span.post-action--edit').simulate('click');
      expect(onEdit.calledOnce).to.equal(true);
      expect(onEdit.args[0]).to.eql([]);
    });

    it('renders a span that calls `onDelete` on click', () => {
      expect(wrapper.find('span.post-action--delete').length).to.equal(1);
      wrapper.find('span.post-action--delete').simulate('click');
      expect(onDelete.calledOnce).to.equal(true);
      expect(onDelete.args[0]).to.eql([]);
    });
  });
});
