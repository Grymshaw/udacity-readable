import { connect } from 'react-redux';
import uuid from 'uuid/v4';

import * as actions from '../actions/comments';
import NewCommentForm from './NewCommentForm';

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSubmit: (comment) => {
    const newComment = {
      ...comment,
      id: uuid(),
      parentId: ownProps.parentId,
      timestamp: Date.now(),
    };
    actions.addComment(newComment)(dispatch);
    // re-fetch comments so they display in comment list
    actions.fetchPostComments(ownProps.parentId)(dispatch);
  },
});

export default connect(null, mapDispatchToProps)(NewCommentForm);
