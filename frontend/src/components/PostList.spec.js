/* eslint "no-undef": 0 */
/* eslint "react/jsx-filename-extension": 0 */
import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';

import PostList from './PostList';

const time = Date.now();
const posts = [
  {
    id: '0',
    author: 'me',
    body: 'post 0 body',
    category: 'react',
    timestamp: time,
    title: 'post 0 title',
  },
  {
    id: '1',
    author: 'not me',
    body: 'post 1 body',
    category: 'redux',
    timestamp: time - 10000,
    title: 'post 1 title',
  },
];

describe('<PostList />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<PostList posts={posts} />);
  });

  it('renders successfully', () => {
    expect(wrapper.length).to.equal(1);
  });

  it('renders a wrapping div', () => {
    expect(wrapper.find('div').length).to.equal(1);
  });

  it('renders a <Post /> for each post in `posts` prop', () => {
    expect(wrapper.find('Post').length).to.equal(posts.length);
  });

  it('renders no <Post />s if `posts` prop not provided', () => {
    wrapper = shallow(<PostList />);
    expect(wrapper.find('div').first().children().length).to.equal(0);
  });
});
