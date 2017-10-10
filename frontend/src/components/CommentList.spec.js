/* eslint "no-undef": 0 */
/* eslint "react/jsx-filename-extension": 0 */
import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';

import CommentList from './CommentList';
import CommentContainer from './CommentContainer';

describe('<CommentList />', () => {
  const comments = [
    { id: '0', body: 'comment 0' },
    { id: '1', body: 'comment 1' },
    { id: '2', body: 'comment 2' },
  ];

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<CommentList comments={comments} />);
  });

  it('renders successfully', () => {
    expect(wrapper.length).to.equal(1);
  });

  it('renders a containing div', () => {
    expect(wrapper.find('div').length).to.equal(1);
  });

  it('renders a <CommentContainer /> for each in `comments` prop', () => {
    expect(wrapper.find(CommentContainer).length).to.equal(comments.length);
  });
});
