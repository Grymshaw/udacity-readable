import PropTypes from 'prop-types';
import React from 'react';

import Button from './Button';

const VotingActions = ({ onDownvote, onUpvote, postId }) => (
  <div className="voting-actions">
    <Button onClick={() => onUpvote(postId)}>Upvote</Button>
    <Button onClick={() => onDownvote(postId)}>Downvote</Button>
  </div>
);

VotingActions.propTypes = {
  onDownvote: PropTypes.func.isRequired,
  onUpvote: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
};

export default VotingActions;
