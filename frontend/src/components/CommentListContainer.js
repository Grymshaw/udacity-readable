import { connect } from 'react-redux';

import CommentList from './CommentList';
import * as postActions from '../actions/comments';
// import * as sortActions from '../actions/sortOrder';

const mapDispatchToProps = (dispatch, ownProps) => ({
  onMount: () => {
    postActions.fetchPostComments(ownProps.parentId)(dispatch);
    // dispatch(sortActions.setSortOrder('recentFirst'));
  },
});

const mapStateToProps = state => ({
  comments: Object.keys(state.comments.comments)
    .map(key => state.comments.comments[key])
    .sort((a, b) => {
      switch (state.sortOrder.order) {
        case 'recentFirst':
          return b.timestamp - a.timestamp;
        case 'oldestFirst':
          return a.timestamp - b.timestamp;
        case 'votesAscending':
          return a.voteScore - b.voteScore;
        case 'votesDescending':
        default:
          return b.voteScore - a.voteScore;
      }
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);
