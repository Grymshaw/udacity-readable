import PropTypes from 'prop-types';
import React from 'react';

import PostVotingContainer from './PostVotingContainer';

const Post = ({ post }) => (
  <div className="container">
    <div className="post-title">
      {post.title}
    </div>
    <div className="post-footer">
      <PostVotingContainer postId={post.id} />
      {post.voteScore} points by {post.author} at {post.timestamp}
      <br />
      Category: {post.category}
    </div>
  </div>
);

Post.propTypes = {
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

export default Post;
