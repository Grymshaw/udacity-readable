/* eslint "no-undef": 0 */
/* eslint "react/jsx-filename-extension": 0 */
import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';

import CategoryListView from './CategoryListView';
import PostListContainer from './PostListContainer';

describe('<CategoryListView />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<CategoryListView match={{ params: { category: 'react' } }} />);
  });

  it('renders successfully', () => {
    expect(wrapper.length).to.equal(1);
  });

  it('renders a <PostListContainer />', () => {
    expect(wrapper.find(PostListContainer).length).to.equal(1);
  });
});
