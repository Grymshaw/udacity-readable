import { connect } from 'react-redux';

import * as actions from '../actions/posts';
import PostDetails from './PostDetails';

const mapDispatchToProps = (dispatch, ownProps) => ({
  onMount: () => actions.fetchAllPosts()(dispatch).then(() => {
    dispatch(actions.setCurrentPost(ownProps.id));
  }),
});

const mapStateToProps = (state, ownProps) => ({
  post: state.posts.posts[state.posts.currentPost],
});

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails);
