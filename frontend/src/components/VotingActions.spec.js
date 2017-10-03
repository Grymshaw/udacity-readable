/* eslint "no-undef": 0 */
import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';

import VotingActions from './VotingActions';

describe('<VotingActions />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<VotingActions
      onDownvote={() => {}}
      onUpvote={() => {}}
      id={'0'}
    />);
  });

  it('renders successfully', () => {
    expect(wrapper.length).to.equal(1);
  });

  it('renders a .voting-actions', () => {
    expect(wrapper.find('.voting-actions').length).to.equal(1);
  });

  it('renders 2 <Button /> components', () => {
    expect(wrapper.find('Button').length).to.equal(2);
  });
});
