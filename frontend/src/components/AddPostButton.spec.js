/* eslint "no-undef": 0 */
import { expect } from 'chai';
import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import sinon from 'sinon';

import * as types from '../constants/ActionTypes';
import AddPostButton from './AddPostButton';

describe('<AddPostButton />', () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = configureMockStore()({});
    sinon.spy(store, 'dispatch');
    wrapper = mount(<Provider store={store}>
      <AddPostButton>
        Add post
      </AddPostButton>
    </Provider>);
  });

  afterEach(() => {
    store.dispatch.restore();
  });

  it('renders successfully', () => {
    expect(wrapper).to.be.ok;
  });

  it('sets the addPost prop on <Button />', () => {
    wrapper.find('Button').props().addPost();
    expect(store.dispatch.callCount).to.equal(1);
    expect(store.dispatch.calledWith({ type: types.ADD_NEW_POST }));
  });

  it('renders children in the child button', () => {
    expect(wrapper.find('button').text()).to.equal('Add post')
  });
});
