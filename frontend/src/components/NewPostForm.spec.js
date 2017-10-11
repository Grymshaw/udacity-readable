/* eslint "no-undef": 0 */
/* eslint "react/jsx-filename-extension": 0 */
import { expect } from 'chai';
import { mount } from 'enzyme';
import React from 'react';

import NewPostForm from './NewPostForm';

describe('<NewPostForm />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<NewPostForm />);
  });

  it('renders successfully', () => {
    expect(wrapper.length).to.equal(1);
  });

  it('renders a text input for author and title', () => {
    expect(wrapper.find('input[type="text"]').length).to.equal(2);
  });

  it('renders a textarea for post body', () => {
    expect(wrapper.find('textarea').length).to.equal(1);
  });

  it('renders a category select', () => {
    expect(wrapper.find('select').length).to.equal(1);
  });

  it('renders a submit button', () => {
    expect(wrapper.find('button[type="submit"]').length).to.equal(1);
  });
});
