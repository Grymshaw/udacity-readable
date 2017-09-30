import { connect } from 'react-redux';

import * as actions from '../actions/posts';
import PostList from './PostList';

const mapStateToProps = state => ({
  posts: Object.keys(state.posts.posts).map(key => state.posts.posts[key]),
});

const mapDispatchToProps = dispatch => ({
  onMount: () => actions.fetchAllPosts()(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
