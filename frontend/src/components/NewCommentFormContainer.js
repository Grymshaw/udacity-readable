import { connect } from 'react-redux';

import * as actions from '../actions/comments';
import NewCommentForm from './NewCommentForm';

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSubmit: (comment) => {
    const newComment = {
      ...comment,
      id: Math.round(Math.random() * 10000).toString(),
      parentId: ownProps.parentId,
      timestamp: Date.now(),
    };
    actions.addComment(newComment)(dispatch);
    // re-fetch comments so they display in comment list
    actions.fetchPostComments(ownProps.parentId)(dispatch);
  },
});

export default connect(null, mapDispatchToProps)(NewCommentForm);
