/* eslint "no-undef": 0 */
/* eslint "react/jsx-filename-extension": 0 */
import { expect } from 'chai';
import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import sinon from 'sinon';

import Comment from './Comment';
import CommentVotingContainer from './CommentVotingContainer';

describe('<Comment />', () => {
  const onDelete = sinon.spy();
  const onEdit = sinon.spy();
  const onEditCancel = sinon.spy();
  const onEditSubmit = sinon.spy();
  const actions = { onDelete, onEdit, onEditCancel, onEditSubmit };

  let store;
  let wrapper;

  const now = Date.now();
  const comment = {
    id: '0',
    parentId: '1',
    author: 'me',
    body: 'comment body',
    timestamp: now,
    voteScore: 10,
  };

  describe('when `isEditing` prop is true', () => {
    const isEditing = true;
    beforeEach(() => {
      store = configureMockStore()({});
      wrapper = mount(
        <Provider store={store}>
          <Comment {...actions} comment={comment} isEditing={isEditing} />
        </Provider>,
      );
    });
    it('renders successfully', () => {
      expect(wrapper.length).to.equal(1);
    });
    it('renders a form', () => {
      expect(wrapper.find('form').length).to.equal(1);
    });
    it('renders a textarea pre-populated with the comment body', () => {
      expect(wrapper.find('textarea').length).to.equal(1);
      expect(wrapper.find('textarea').props().value).to.equal(comment.body);
    });
    it('renders a button that calls `onEditCancel` on click', () => {
      expect(wrapper.find('button.edit-action--cancel').length).to.equal(1);
      wrapper.find('button.edit-action--cancel').simulate('click');
      expect(onEditCancel.calledOnce).to.equal(true);
      expect(onEditCancel.args[0]).to.eql([]);
    });
    it('renders a button that calls `onEditSubmit` on click', () => {
      expect(wrapper.find('button.edit-action--submit').length).to.equal(1);
      wrapper.find('button.edit-action--submit').simulate('click');
      expect(onEditSubmit.calledOnce).to.equal(true);
      // this is kind of hacky -- won't always pass b/c timestamps may vary,
      // so have to subtract 1 from Date.now() to see if timestamps are close enough
      expect(
        onEditSubmit.calledWith({ body: comment.body, timestamp: Date.now() })
        ||
        onEditSubmit.calledWith({ body: comment.body, timestamp: Date.now() - 1 })
      ).to.eql(true);
    });
  });

  describe('when `isEditing` prop is false', () => {
    const isEditing = false;
    beforeEach(() => {
      store = configureMockStore()({});
      wrapper = mount(
        <Provider store={store}>
          <Comment {...actions} comment={comment} isEditing={isEditing} />
        </Provider>,
      );
    });
    it('renders successfully', () => {
      expect(wrapper.length).to.equal(1);
    });
    it('renders <CommentVotingContainer />', () => {
      expect(wrapper.find(CommentVotingContainer).length).to.equal(1);
    });
    it('renders a containing div', () => {
      expect(wrapper.find('div').length).to.be.above(0);
    });
    it('renders delete and edit actions', () => {
      expect(wrapper.find('span.comment-action').length).to.equal(2);
    });
    it('calls `onDelete` when delete action is clicked', () => {
      wrapper.find('span.comment-action--delete').simulate('click');
      expect(onDelete.calledOnce).to.equal(true);
      expect(onDelete.args[0]).to.eql([]);
    });
    it('calls `onEdit` when edit action is clicked', () => {
      wrapper.find('span.comment-action--edit').simulate('click');
      expect(onEdit.calledOnce).to.equal(true);
      expect(onEdit.args[0]).to.eql([]);
    });
  });
});
