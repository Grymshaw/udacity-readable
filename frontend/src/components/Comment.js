/* eslint "react/jsx-filename-extension": 0 */
import PropTypes from 'prop-types';
import React from 'react';

import CommentVotingContainer from './CommentVotingContainer';

const Comment = ({ comment }) => (
  <div className="comment">
    <p className="comment__body">{comment.body}</p>
    <div className="comment__footer">
      {comment.voteScore} points <br />
      by {comment.author} <br />
      {comment.timestamp}
    </div>
    <CommentVotingContainer commentId={comment.id} />
  </div>
);

Comment.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.string,
    author: PropTypes.string,
    body: PropTypes.string,
    timestamp: PropTypes.number,
    voteScore: PropTypes.number,
  }).isRequired,
};

export default Comment;
