import { connect } from 'react-redux';

import * as actions from '../actions/posts';
import VotingActions from './VotingActions';

const mapDispatchToProps = (dispatch, ownProps) => ({
  onDownvote: id => actions.downvotePost(id)(dispatch),
  onUpvote: id => actions.upvotePost(id)(dispatch),
  postId: ownProps.postId,
});

export default connect(null, mapDispatchToProps)(VotingActions);
