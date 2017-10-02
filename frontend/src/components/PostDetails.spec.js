/* eslint "no-undef": 0 */
/* eslint "react/jsx-filename-extension": 0 */
import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';

import PostDetails from './PostDetails';
import PostVotingContainer from './PostVotingContainer';

describe('<PostDetails />', () => {
  const post = {
    id: '0',
    author: 'me',
    body: 'hello this is a post',
    title: 'this is the title',
    timestamp: Date.now(),
  };

  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<PostDetails post={post} />);
  });

  it('renders successfully', () => {
    expect(wrapper.length).to.equal(1);
  });

  describe('rendered content', () => {
    it('includes a wrapping .container', () => {
      expect(wrapper.find('div.container').length).to.equal(1);
    });
    it('includes .post-title', () => {
      expect(wrapper.find('.post-title').length).to.equal(1);
    });
    it('includes .post-subtitle', () => {
      expect(wrapper.find('.post-subtitle').length).to.equal(1);
    });
    it('includes .post-body', () => {
      expect(wrapper.find('.post-body').length).to.equal(1);
    });
    it('includes `PostVotingContainer`', () => {
      expect(wrapper.find(PostVotingContainer).length).to.equal(1);
    });
  });
});
