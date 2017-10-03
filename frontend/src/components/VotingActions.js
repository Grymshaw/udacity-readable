import PropTypes from 'prop-types';
import React from 'react';

import Button from './Button';

const VotingActions = ({ onDownvote, onUpvote, id }) => (
  <div className="voting-actions">
    <Button onClick={() => onUpvote(id)}>Upvote</Button>
    <Button onClick={() => onDownvote(id)}>Downvote</Button>
  </div>
);

VotingActions.propTypes = {
  onDownvote: PropTypes.func.isRequired,
  onUpvote: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default VotingActions;
