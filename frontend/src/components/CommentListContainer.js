import { connect } from 'react-redux';

import CommentList from './CommentList';
import * as postActions from '../actions/comments';

const mapDispatchToProps = (dispatch, ownProps) => ({
  onMount: () => {
    postActions.fetchPostComments(ownProps.parentId)(dispatch);
  },
});

const mapStateToProps = state => ({
  comments: state.comments.comments,
  sortOrder: state.sortOrder.order,
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);
