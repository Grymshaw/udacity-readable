/* eslint "no-undef": 0 */
/* eslint "react/jsx-filename-extension": 0 */
import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';

import DropdownList from './DropdownList';

describe('<DropdownList />', () => {
  let fetchData;
  let onChange;
  let wrapper;
  beforeEach(() => {
    onChange = sinon.spy();
    fetchData = sinon.spy();
    wrapper = shallow(
      <DropdownList
        list={[{ name: 'react', value: 'react' }, { name: 'udacity', value: 'udacity' }]}
        onChange={onChange}
        fetchData={fetchData}
      />);
  });

  it('renders a <select>', () => {
    expect(wrapper.find('select').length).to.be.above(0);
  });

  it('renders a select with no options if `list` is not passed', () => {
    wrapper = shallow(<DropdownList
      list={[]}
      onChange={onChange}
      fetchData={fetchData}
    />);
    expect(wrapper.find('option').length).to.equal(0);
  });

  it('renders a selcted with no options if `list` is []', () => {
    wrapper = shallow(<DropdownList
      list={[]}
      onChange={onChange}
      fetchData={fetchData}
    />);
    expect(wrapper.find('option').length).to.equal(0);
  });

  it('renders an `option` for each item in `list` param', () => {
    expect(wrapper.find('option').length).to.equal(2);
  });

  it('calls `onChange` prop when new value selected', () => {
    wrapper.simulate('change', { target: { value: 'udacity' } });
    expect(onChange.callCount).to.equal(1);
    expect(onChange.calledWith('udacity')).to.equal(true);
  });
});
