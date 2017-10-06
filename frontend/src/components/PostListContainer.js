/* eslint "react/jsx-filename-extension": 0 */
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import * as postActions from '../actions/posts';
import * as currentPostActions from '../actions/currentPost';
import PostList from './PostList';

const mapStateToProps = state => ({
  posts: state.posts.posts,
  sortOrder: state.sortOrder.order,
});

const mapDispatchToProps = (dispatch, ownProps) => {
  const onMount = ownProps.category === undefined
    ? () => postActions.fetchAllPosts()(dispatch)
    : () => postActions.fetchCategoryPosts(ownProps.category)(dispatch);
  return {
    onMount,
    onPostClick: (id) => {
      dispatch(currentPostActions.setCurrentPost(id));
      dispatch(push(`/posts/${id}`));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
