import PropTypes from 'prop-types';
import React from 'react';

import './VotingActions.css';
import Button from './Button';

const VotingActions = ({ onDownvote, onUpvote, id }) => (
  <div>
    <Button
      className="voting-action voting-action--upvote"
      onClick={() => onUpvote(id)}
    >
      Upvote
    </Button>
    <Button
      className="voting-action voting-action--downvote"
      onClick={() => onDownvote(id)}
    >
      Downvote
    </Button>
  </div>
);

VotingActions.propTypes = {
  onDownvote: PropTypes.func.isRequired,
  onUpvote: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default VotingActions;
