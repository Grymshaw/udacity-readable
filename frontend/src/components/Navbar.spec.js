/* eslint "no-undef": 0 */
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Navbar from './Navbar';
import PrimaryNav from './PrimaryNav';
import Subnav from './Subnav';

describe('<Navbar />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Navbar />);
  });

  it('renders a wrapper header', () => {
    expect(wrapper.find('header').length).to.be.above(0);
  });

  it('the wrapping header contains everything else that gets rendered', () => {
    expect(wrapper.find('header').first().children()).to.deep.equal(wrapper.children());
  });

  describe('rendered `PrimaryNav`', () => {
    let primaryNav;
    beforeEach(() => {
      primaryNav = wrapper.find(PrimaryNav);
    });
    it('renders a <PrimaryNav />', () => {
      expect(primaryNav.length).to.equal(1);
    });
  });

  describe('rendered `Subnav`', () => {
    let subnav;
    beforeEach(() => {
      subnav = wrapper.find(Subnav);
    });

    it('renders a <SubNav />', () => {
      expect(wrapper.find(Subnav).length).to.equal(1);
    });
  });
});
