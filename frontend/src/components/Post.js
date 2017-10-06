import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';

import PostVotingContainer from './PostVotingContainer';

const Post = ({ onPostClick, post }) => (
  <div style={{ width: '100%' }}>
    <div
      className="post-title"
      onClick={() => onPostClick(post.id)}
      role="link"
      tabIndex={0}
    >
      {post.title}
    </div>
    <div className="post-footer">
      <PostVotingContainer postId={post.id} />
      {post.voteScore} points by {post.author} at {moment(post.timestamp).fromNow()}
      <br />
      Category: {post.category}
    </div>
  </div>
);

Post.propTypes = {
  onPostClick: PropTypes.func,
  post: PropTypes.shape({
    id: PropTypes.string,
    author: PropTypes.string,
    body: PropTypes.string,
    category: PropTypes.string,
    title: PropTypes.string,
    timestamp: PropTypes.number,
    voteScore: PropTypes.nubmer,
  }).isRequired,
};

Post.defaultProps = {
  onPostClick: () => {},
};

export default Post;
