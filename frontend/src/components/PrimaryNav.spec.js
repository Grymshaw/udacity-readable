/* eslint "no-undef": 0 */
import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';

import PrimaryNav from './PrimaryNav';

describe('<PrimaryNav />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<PrimaryNav />);
  });

  it('renders a wrapper div', () => {
    expect(wrapper.find('div').length).to.be.above(0);
  });

  it('renders children inside wrapper div', () => {
    wrapper = shallow(<PrimaryNav>
      <div>BrandHere</div>
    </PrimaryNav>);
    expect(wrapper.find('.container').first().children().node).to.deep.equal(<div>BrandHere</div>);
  });
});
