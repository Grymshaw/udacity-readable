import { connect } from 'react-redux';

import Comment from './Comment';
import * as actions from '../actions/comments';

const mapDispatchToProps = (dispatch, ownProps) => ({
  onDelete: () => {
    actions.deleteComment(ownProps.comment.id)(dispatch)
      .then(() => {
        actions.fetchPostComments(ownProps.comment.parentId)(dispatch);
      });
  },
  onEdit: () => dispatch(actions.setIsCommentEditing(true, ownProps.comment.id)),
  onEditCancel: () => dispatch(actions.setIsCommentEditing(false, null)),
  onEditSubmit: (edits) => {
    actions.editComment(ownProps.comment.id, edits)(dispatch)
      .then(() => {
        actions.fetchPostComments(ownProps.comment.parentId)(dispatch);
      });
    dispatch(actions.setIsCommentEditing(false, null));
  },
});

const mapStateToProps = (state, ownProps) => ({
  comment: ownProps.comment,
  isEditing: state.comments.isEditing && state.comments.currentCommentEditing === ownProps.comment.id,
});

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
