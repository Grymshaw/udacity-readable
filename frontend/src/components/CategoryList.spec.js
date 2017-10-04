/* eslint "no-undef": 0 */
/* eslint "react/jsx-filename-extension": 0 */
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
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
          'Content-Type': 'application/json',
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
    wrapper = mount(<CategoryList store={store} />);
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
    it('receives `list` prop from <CategoryList />', () => {
      expect(wrapper.find('DropdownList').first().props().list).to.eql(
        // CategoryList adds 'View all' to start of dropdown array
        [{ name: 'View all', value: '/' }, ...store.getState().categories.categories],
      );
    });

    it('receives `fetchData` as prop from <CategoryList />', () => {
      // fetchData called in <DropdownList /> componentWillMount
      expect(store.getActions()).to.eql([{ type: types.FETCH_CATEGORIES_REQUEST }]);
    });

    describe('received `onChange` prop from <CategoryList />', () => {
      beforeEach(() => {
        // must re-initialize store and fetch response to test dispatch
        // from `onChange` prop
        window.fetch.restore();
        sinon.stub(window, 'fetch');
        const res = new window.Response(
          JSON.stringify(categoriesResponse),
          {
            status: 200,
            headers: {
              Authorization: 'whatever',
              'Content-Type': 'application/json',
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

        wrapper = shallow(<CategoryList store={store} />);
      });

      it('dispatches FETCH_CATEGORY_POSTS_REQUEST if changed to a category', () => {
        wrapper.find('DropdownList').first().props().onChange('react');
        const expectedActions = [
          {
            type: '@@router/CALL_HISTORY_METHOD',
            payload: { method: 'push', args: ['/categories/react'] },
          },
          { type: types.FETCH_CATEGORY_POSTS_REQUEST },
        ];
        expect(store.getActions()).to.eql(expectedActions);
      });

      it('dispatches FETCH_ALL_POSTS_REQUEST if changed to a root', () => {
        wrapper.find('DropdownList').first().props().onChange('/');
        const expectedActions = [
          {
            type: '@@router/CALL_HISTORY_METHOD',
            payload: { method: 'push', args: ['/'] },
          },
          { type: types.FETCH_ALL_POSTS_REQUEST },
        ];
        expect(store.getActions()).to.eql(expectedActions);
      });
    });
  });
});
