/* eslint "no-undef": 0 */
/* eslint "react/jsx-filename-extension": 0 */
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Subnav from './Subnav';

describe('<Subnav />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Subnav />);
  });

  it('renders successfully', () => {
    expect(wrapper).to.be.ok;
  });

  it('renders everything in a wrapper div', () => {
    expect(wrapper.find('div').length).to.be.above(0);
  });

  it('renders children inside a .container', () => {
    wrapper = shallow(<Subnav>
      <div>Add post</div>
      <div>Select category</div>
    </Subnav>);
    expect(wrapper.find('.container').length).to.equal(1);
    expect(wrapper.find('.container').first().children().contains(<div>Add post</div>)).to.equal(true);
    expect(wrapper.find('.container').first().children().contains(<div>Select category</div>)).to.equal(true);
  });
});
