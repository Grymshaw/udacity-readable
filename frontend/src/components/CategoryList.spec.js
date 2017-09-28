/* eslint "no-undef": 0 */
/* eslint "react/jsx-filename-extension": 0 */
import { expect } from 'chai';
import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import sinon from 'sinon';
import thunk from 'redux-thunk';

import * as types from '../constants/ActionTypes';
import CategoryList from './CategoryList';

const categoriesResponse = {
  categories: [
    { name: 'react', path: 'react' },
    { name: 'redux', path: 'redux' },
    { name: 'udacity', path: 'udacity' },
  ],
};

describe('<CategoryList />', () => {
  let store;
  let wrapper;

  beforeEach(() => {
    sinon.stub(window, 'fetch');
    const res = new window.Response(
      JSON.stringify(categoriesResponse),
      {
        status: 200,
        headers: {
          Authorization: 'whatever',
          'Content-type': 'application/json',
        },
      },
    );
    window.fetch.returns(Promise.resolve(res));

    store = configureMockStore([thunk])({
      categories: {
        list: ['react', 'redux', 'udacity'],
        isRequestPending: false,
      },
    });
    sinon.spy(store, 'dispatch');
    wrapper = mount(
      // <Provider store={store}>
        <CategoryList store={store} />
      // </Provider>);
      );
  });

  afterEach(() => {
    window.fetch.restore();
  });

  it('renders successfully', () => {
    expect(wrapper).to.have.length(1);
  });

  it('renders a <DropdownList>', () => {
    expect(wrapper.find('DropdownList').length).to.equal(1);
  });

  describe('rendered <DropdownList />', () => {
    // it('receives `list` prop from <CategoryList />', () => {
    //   expect(wrapper.find(<DropdownList />).first().props().list).to.eql(store.getState().list);
    // });

    it('receives `fetchData` as prop from <CategoryList />', () => {
      // fetchData called in <DropdownList /> componentWillMount
      expect(store.dispatch.callCount).to.be.above(0);
      expect(store.getActions()).to.deep.contain({ type: types.FETCH_CATEGORIES_REQUEST });
      // expect(store.getActions()).to.deep.contain({
      //   type: types.FETCH_CATEGORIES_SUCCESS,
      //   categories: ['react', 'redux', 'udacity'],
      // });
    });

    it('receives `onChange` prop from <CategoryList />', () => {
      wrapper.find('DropdownList').first().props().onChange('react');
      expect(store.dispatch.callCount).to.be.above(0);
      expect(store.dispatch.calledWith({
        type: '@@router/CALL_HISTORY_METHOD',
        payload: { method: 'push', args: ['/react'] },
      }));
      // expect(store.dispatch.calledWith({ type: types.CHANGE_CATEGORY, category: 'react' })).to.equal(true);
      // expect(store.getActions()).to.deep.contain({ type: types.CHANGE_CATEGORY, category: 'react' });
    });
  });
});
