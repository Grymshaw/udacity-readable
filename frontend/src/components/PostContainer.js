import { connect } from 'react-redux';

import * as actions from '../actions/posts';
import Post from './Post';

const mapDispatchToProps = (dispatch, ownProps) => ({
  onCancelEdit: () => dispatch(actions.setIsPostEditing(false, null)),
  onDelete: () => {
    actions.deletePost(ownProps.post.id)(dispatch)
      .then(() => {
        actions.fetchAllPosts()(dispatch);
      });
  },
  onEdit: () => dispatch(actions.setIsPostEditing(true, ownProps.post.id)),
  onEditSubmit: (edits) => {
    actions.editPost(ownProps.post.id, edits)(dispatch)
      .then(() => {
        actions.fetchAllPosts()(dispatch);
      });
    dispatch(actions.setIsPostEditing(false, null));
  },
  onPostClick: ownProps.onPostClick,
  post: ownProps.post,
});

const mapStateToProps = (state, ownProps) => ({
  isEditing: state.posts.isEditing && state.posts.currentPostEditing === ownProps.post.id,
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);
