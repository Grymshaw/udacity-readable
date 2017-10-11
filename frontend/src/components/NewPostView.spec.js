/* eslint "no-undef": 0 */
/* eslint "react/jsx-filename-extension": 0 */
import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';

import NewPostFormContainer from './NewPostFormContainer';
import NewPostView from './NewPostView';

describe('<NewPostView />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<NewPostView match={{ params: { category: 'blargh' } }} />);
  });

  it('renders successfully', () => {
    expect(wrapper.length).to.equal(1);
  });

  it('renders a <PrimaryNav />', () => {
    expect(wrapper.find('PrimaryNav').length).to.equal(1);
  });

  it('renders a <Subnav />', () => {
    expect(wrapper.find('Subnav').length).to.equal(1);
  });

  it('renders a <NewPostFormContainer />', () => {
    expect(wrapper.find(NewPostFormContainer).length).to.equal(1);
  });
});
