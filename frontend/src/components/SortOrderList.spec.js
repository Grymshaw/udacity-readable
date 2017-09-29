/* eslint "no-undef": 0 */
/* eslint "react/jsx-filename-extension": 0 */
import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';
import configureMockStore from 'redux-mock-store';

import SortOrderList from './SortOrderList';
import * as types from '../constants/ActionTypes';

describe('<SortOrderList />', () => {
  let wrapper;
  let store;

  beforeEach(() => {
    store = configureMockStore()({
      sortOrder: {
        order: 'votesDescending',
      },
    });
    sinon.spy(store, 'dispatch');
    wrapper = shallow(<SortOrderList store={store} />);
  });

  afterEach(() => {
    store.dispatch.restore();
  });

  it('renders successfully', () => {
    expect(wrapper.length).to.equal(1);
  });

  describe('rendered DropdownList', () => {
    it('renders', () => {
      expect(wrapper.find('DropdownList').length).to.equal(1);
    });

    it('receives list prop from <SortOrderList />', () => {
      expect(wrapper.find('DropdownList').first().props().list).to.eql([
        { name: 'Vote count (ascending)', value: 'votesAscending' },
        { name: 'Vote count (descending)', value: 'votesDescending' },
        { name: 'Recent first', value: 'recentFirst' },
        { name: 'Oldest frist', value: 'oldestFirst' },
      ]);
    });

    it('receives onChange prop from <SortOrderList />', () => {
      wrapper.find('DropdownList').first().props().onChange('votesDescending');
      expect(store.dispatch.calledOnce).to.equal(true);
      expect(store.dispatch.calledWith({ type: types.CHANGE_SORT_ORDER, order: 'votesDescending' }));
    });
  });
});
