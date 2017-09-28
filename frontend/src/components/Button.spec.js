import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';

import Button from './Button';

describe('<Button />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Button>Text</Button>);
  });
  it('renders successfully', () => {
    expect(wrapper).to.be.ok;
  });

  it('renders a button', () => {
    expect(wrapper.find('button').length).to.equal(1);
  });

  it('renders children in the button', () => {
    expect(wrapper.find('button').first().children().node).to.deep.equal('Text');
  });
});
