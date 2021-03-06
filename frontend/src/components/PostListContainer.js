/* eslint "react/jsx-filename-extension": 0 */
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import * as postActions from '../actions/posts';
import * as commentActions from '../actions/comments';
import * as currentPostActions from '../actions/currentPost';
import PostList from './PostList';

const mapStateToProps = state => ({
  comments: state.comments.comments,
  posts: state.posts.posts,
  sortOrder: state.sortOrder.order,
});

const mapDispatchToProps = (dispatch, ownProps) => {
  const onMount = () => {
    const fetchPostsFunction = ownProps.category === undefined
      ? () => postActions.fetchAllPosts()(dispatch)
      : () => postActions.fetchCategoryPosts(ownProps.category)(dispatch);
    fetchPostsFunction()
      .then((postsPromise) => {
        const parentIds = postsPromise.posts.map(post => post.id);
        commentActions.fetchAllPostsComments(parentIds)(dispatch);
      });
  };
  return {
    category: ownProps.category,
    onMount,
    onPostClick: (post) => {
      dispatch(currentPostActions.setCurrentPost(post.id));
      dispatch(push(`/${post.category}/${post.id}`));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
