import moment from 'moment';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import PostVotingContainer from './PostVotingContainer';

class PostDetails extends Component {
  componentDidMount() {
    const { onMount, id } = this.props;
    onMount(id);
  }
  render() {
    const { post } = this.props;
    return (
      post
        ? <div>
          <div className="post-title">{post.title}</div>
          <div className="post-subtitle">
            {post.voteScore} points by {post.author}
            <br />
            {moment(post.timestamp).fromNow()}
          </div>
          <div className="post-body">
            {post.body}
          </div>
          <div className="voting-actions voting-actions--post-detail">
            <PostVotingContainer postId={post.id} />
          </div>
        </div>
        : null
    );
  }
}

PostDetails.propTypes = {
  onMount: PropTypes.func,
  id: PropTypes.string,
  post: PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
    voteScore: PropTypes.number,
    timestamp: PropTypes.number,
    body: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
};

PostDetails.defaultProps = {
  onMount: () => {},
  id: '',
};

export default PostDetails;
