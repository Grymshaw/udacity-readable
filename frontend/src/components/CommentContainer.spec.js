/* eslint "no-undef": 0 */
/* eslint "react/jsx-filename-extension": 0 */
import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';
import configureMockStore from 'redux-mock-store';
import sinon from 'sinon';

import CommentContainer from './CommentContainer';
import * as types from '../constants/ActionTypes';

describe('<CommentContainer />', () => {
  let store;
  let wrapper;

  const comment = {
    body: 'hello comment body',
    id: '0',
    parentId: '1',
  };

  beforeEach(() => {
    sinon.stub(window, 'fetch');
    const res = new window.Response(
      JSON.stringify(comment),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    window.fetch.returns(Promise.resolve(res));

    store = configureMockStore()({ comments: { isEditing: false, currentCommentEditing: null } });
    wrapper = shallow(<CommentContainer comment={comment} store={store} />);
  });

  afterEach(() => {
    window.fetch.restore();
  });

  it('renders successfully', () => {
    expect(wrapper.length).to.equal(1);
  });

  describe('rendered <Comment />', () => {
    it('renders', () => {
      expect(wrapper.find('Comment').length).to.equal(1);
    });

    it('receives `onEdit` in props', () => {
      wrapper.find('Comment').props().onEdit();
      expect(store.getActions()).to.eql([
        { type: types.SET_IS_COMMENT_EDITING, isEditing: true, currentCommentEditing: comment.id },
      ]);
    });

    it('receives onEditCancel in props', () => {
      wrapper.find('Comment').props().onEditCancel();
      expect(store.getActions()).to.eql([
        { type: types.SET_IS_COMMENT_EDITING, isEditing: false, currentCommentEditing: null },
      ]);
    });
  });
});
