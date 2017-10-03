import { connect } from 'react-redux';

import * as actions from '../actions/comments';
import VotingActions from './VotingActions';

const mapDispatchToProps = (dispatch, ownProps) => ({
  onUpvote: id => actions.upvoteComment(id)(dispatch),
  onDownvote: id => actions.downvoteComment(id)(dispatch),
  id: ownProps.commentId,
});

export default connect(null, mapDispatchToProps)(VotingActions);
