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

  it('renders a select with only default option if `list` is not passed', () => {
    wrapper = shallow(<DropdownList
      list={[]}
      onChange={onChange}
      fetchData={fetchData}
    />);
    expect(wrapper.find('option').length).to.equal(1);
  });

  it('renders a selcted with only default option if `list` is []', () => {
    wrapper = shallow(<DropdownList
      list={[]}
      onChange={onChange}
      fetchData={fetchData}
    />);
    expect(wrapper.find('option').length).to.equal(1);
  });

  it('renders an `option` for each item in `list` param', () => {
    // add 1 because of default "Select an option"
    expect(wrapper.find('option').length).to.equal(2 + 1);
  });

  it('select is required if isRequired prop is true', () => {
    const isRequired = true;
    wrapper = shallow(<DropdownList list={[]} isRequired={isRequired} />);
    expect(wrapper.find('select[required="required"]').length).to.equal(1);
  });

  it('select is not required if isRequired prop is not passed in', () => {
    wrapper = shallow(<DropdownList list={[]} />);
    expect(wrapper.find('select[required=""]').length).to.equal(1);
  });

  it('select is not required if isRequired prop is false', () => {
    const isRequired = false;
    wrapper = shallow(<DropdownList list={[]} isRequired={isRequired} />);
    expect(wrapper.find('select[required=""]').length).to.equal(1);
  });

  it('calls `onChange` prop when new value selected', () => {
    wrapper.simulate('change', { target: { value: 'udacity' } });
    expect(onChange.callCount).to.equal(1);
    expect(onChange.calledWith({ target: { value: 'udacity' } })).to.equal(true);
  });
});
