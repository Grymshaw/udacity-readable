/* eslint "react/jsx-filename-extension": 0 */
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import * as postActions from '../actions/posts';
import * as currentPostActions from '../actions/currentPost';
import PostList from './PostList';

const mapStateToProps = state => ({
  // get posts array from posts object in state
  posts: Object.keys(state.posts.posts)
    .map(key => state.posts.posts[key])
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
