import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';

import Button from './Button';

describe('<Button />', () => {
  let onClick = sinon.spy();
  let wrapper;
  beforeEach(() => {
    onClick = sinon.spy();
    wrapper = shallow(<Button onClick={onClick}>Text</Button>);
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

  it('calls onClick when clicked', () => {
    wrapper.find('button').simulate('click');
    expect(onClick.calledOnce).to.equal(true);
  });
});
