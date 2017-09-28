/* eslint "no-undef": 0 */
import { expect } from 'chai';
import { mount } from 'enzyme';
import React from 'react';
// import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import sinon from 'sinon';

// import * as actions from '../actions/navigation';
// import * as types from '../constants/ActionTypes';
import AddPostButton from './AddPostButton';

describe('<AddPostButton />', () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = configureMockStore()({});
    sinon.spy(store, 'dispatch');
    wrapper = mount(<AddPostButton store={store}>Add post</AddPostButton>);
  });

  afterEach(() => {
    store.dispatch.restore();
  });

  it('renders successfully', () => {
    expect(wrapper.length).to.equal(1);
  });

  it('sets the onClick prop on <Button />', () => {
    wrapper.find('Button').props().onClick();
    expect(store.dispatch.callCount).to.equal(1);
    expect(store.dispatch.calledWith({
      type: '@@router/CALL_HISTORY_METHOD',
      payload: { method: 'push', args: ['/new'] },
    })).to.equal(true);
  });

  it('renders children in the child button', () => {
    expect(wrapper.find('button').text()).to.equal('Add post');
  });
});
