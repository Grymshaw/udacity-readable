/* eslint "no-undef": 0 */
/* eslint "react/jsx-filename-extension": 0 */
import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';

import NewCommentForm from './NewCommentForm';

describe('<NewCommentForm />', () => {
  let wrapper;
  let onSubmit;

  beforeEach(() => {
    onSubmit = sinon.spy();
    wrapper = shallow(<NewCommentForm onSubmit={onSubmit} />);
  });

  it('renders successully', () => {
    expect(wrapper.length).to.equal(1);
  });

  it('renders a name text input', () => {
    expect(wrapper.find('input[type="text"]').length).to.equal(1);
  });

  it('renders a comment textarea', () => {
    expect(wrapper.find('textarea').length).to.equal(1);
  });

  it('renders a submit button', () => {
    expect(wrapper.find('button[type="submit"]').length).to.equal(1);
  });
});

