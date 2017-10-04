/* eslint "no-undef": 0 */
/* eslint "react/jsx-filename-extension": 0 */
import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';
import configureMockStore from 'redux-mock-store';
import sinon from 'sinon';
import * as types from '../constants/ActionTypes';

import NewCommentFormContainer from './NewCommentFormContainer';

describe('<NewCommentFormContainer />', () => {
  let wrapper;
  let store;

  const comment = {
    id: '1',
    parentId: '0',
    author: 'me',
    body: 'hello',
    timestamp: Date.now(),
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

    store = configureMockStore()({});
    wrapper = shallow(<NewCommentFormContainer parentId={'0'} store={store} />);
  });

  afterEach(() => {
    window.fetch.restore();
  });

  it('renders successfully', () => {
    expect(wrapper.length).to.equal(1);
  });

  describe('rendered <NewCommentForm />', () => {
    it('renders', () => {
      expect(wrapper.find('NewCommentForm').length).to.equal(1);
    });

    // it('receives onSubmit in props', () => {
    //   const expectedActions = [
    //     { type: types.ADD_COMMENT_REQUEST },
    //     // { type: types.ADD_COMMENT_SUCCESS, comment },
    //   ];
    //   wrapper.find('NewCommentForm').first().props().onSubmit('0');
    //   expect(store.getActions()).to.eql(expectedActions);
    // });
  });
});
