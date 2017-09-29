/* eslint "no-undef": 0 */
/* eslint "react/jsx-filename-extension": 0 */
import { expect } from 'chai';
import { mount } from 'enzyme';
import React from 'react';
import configureMockStore from 'redux-mock-store';
import sinon from 'sinon';
import thunk from 'redux-thunk';

import * as types from '../constants/ActionTypes';
import CategoryList from './CategoryList';

// same as expected shape returned by /categories API endpoint
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
        categories: [
          { name: 'react', value: 'react' },
          { name: 'redux', value: 'redux' },
          { name: 'udacity', value: 'udacity' },
        ],
        isRequestPending: false,
      },
    });
    sinon.spy(store, 'dispatch');
    wrapper = mount(<CategoryList store={store} />);
  });

  afterEach(() => {
    store.dispatch.restore();
    window.fetch.restore();
  });

  it('renders successfully', () => {
    expect(wrapper).to.have.length(1);
  });

  it('renders a <DropdownList>', () => {
    expect(wrapper.find('DropdownList').length).to.equal(1);
  });

  describe('rendered <DropdownList />', () => {
    it('receives `list` prop from <CategoryList />', () => {
      expect(wrapper.find('DropdownList').first().props().list).to.eql(
        // CategoryList adds 'View all' to start of dropdown array
        [{ name: 'View all', value: '/' }, ...store.getState().categories.categories],
      );
    });

    it('receives `fetchData` as prop from <CategoryList />', () => {
      // fetchData called in <DropdownList /> componentWillMount
      expect(store.dispatch.callCount).to.be.above(0);
      expect(store.getActions()).to.deep.contain({ type: types.FETCH_CATEGORIES_REQUEST });
    });

    it('receives `onChange` prop from <CategoryList />', () => {
      wrapper.find('DropdownList').first().props().onChange('react');
      expect(store.dispatch.callCount).to.be.above(0);
      expect(store.dispatch.calledWith({
        type: '@@router/CALL_HISTORY_METHOD',
        payload: { method: 'push', args: ['/react'] },
      }));
    });
  });
});
