import { connect } from 'react-redux';

import * as actions from '../actions/comments';
import CommentList from './CommentList';

const mapDispatchToProps = (dispatch, ownProps) => ({
  onMount: () => actions.fetchPostComments(ownProps.parentId)(dispatch),
});

const mapStateToProps = state => ({
  comments: Object.keys(state.comments.comments).map(key => state.comments.comments[key]),
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);
