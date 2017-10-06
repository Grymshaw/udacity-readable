/* eslint "no-undef": 0 */
/* eslint "react/jsx-filename-extension": 0 */
import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';
import configureMockStore from 'redux-mock-store';

import PostContainer from './PostContainer';
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
  let store;
  let wrapper;
  beforeEach(() => {
    store = configureMockStore()({ posts: { isEditing: false } });
    wrapper = shallow(<PostList posts={posts} store={store} />);
  });

  it('renders successfully', () => {
    expect(wrapper.length).to.equal(1);
  });

  it('renders a wrapping div', () => {
    expect(wrapper.find('div').length).to.equal(1);
  });

  it('renders a <PostContainer /> for each post in `posts` prop', () => {
    expect(wrapper.find(PostContainer).length).to.equal(posts.length);
  });

  // handled by default props already (I think?)
  // it('renders no <PostContainer />s if `posts` prop not provided', () => {
  //   wrapper = shallow(<PostList />);
  //   expect(wrapper.find('div').first().children().length).to.equal(0);
  // });
});
