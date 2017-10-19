/* eslint "no-undef": 0 */
/* eslint "react/jsx-filename-extension": 0 */
import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';

import NotFound from './NotFound';

describe('<NotFound />', () => {
  const history = {};
  let wrapper;

  beforeEach(() => {
    history.goBack = sinon.spy();
    wrapper = shallow(<NotFound history={history} />);
  });

  it('renders successfully', () => {
    expect(wrapper.length).to.equal(1);
  });

  it('goes back on clicking <span...>back</span>', () => {
    wrapper.find('span').simulate('click');
    expect(history.goBack.calledOnce).to.equal(true);
  });
});
