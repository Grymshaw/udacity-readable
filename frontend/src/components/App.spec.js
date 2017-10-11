import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';

import App from './App';

it('renders without crashing', () => {
  const wrapper = shallow(<App match={{ params: 'asdf' }} />);
  expect(wrapper.length).to.equal(1);
});
