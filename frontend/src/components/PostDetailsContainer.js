import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import * as actions from '../actions/posts';
import PostDetails from './PostDetails';

const mapDispatchToProps = (dispatch, ownProps) => ({
  onDelete: () => {
    actions.deletePost(ownProps.id)(dispatch)
      .then(() => {
        actions.fetchAllPosts()(dispatch);
      });
    // navigate back to index view
    dispatch(push('/'));
  },
  onEdit: () => dispatch(actions.setIsPostEditing(true, ownProps.id)),
  onEditCancel: () => dispatch(actions.setIsPostEditing(false, null)),
  onEditSubmit: (edits) => {
    actions.editPost(ownProps.id, edits)(dispatch)
      .then(() => {
        actions.fetchAllPosts()(dispatch);
      });
    dispatch(actions.setIsPostEditing(false, null));
  },
  onMount: () => actions.fetchAllPosts()(dispatch).then(() => {
    dispatch(actions.setCurrentPost(ownProps.id));
  }),
});

const mapStateToProps = (state, ownProps) => ({
  isEditing: state.posts.isEditing && state.posts.currentPostEditing === ownProps.id,
  post: state.posts.posts[state.posts.currentPost],
});

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails);
