import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import * as postActions from '../actions/posts';
import * as currentPostActions from '../actions/currentPost';
import PostList from './PostList';

const mapStateToProps = state => ({
  // get posts array from posts object in state
  posts: Object.keys(state.posts.posts).map(key => state.posts.posts[key]),
});

const mapDispatchToProps = dispatch => ({
  onMount: () => postActions.fetchAllPosts()(dispatch),
  onPostClick: (id) => {
    dispatch(currentPostActions.setCurrentPost(id));
    dispatch(push(`/posts/${id}`));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
