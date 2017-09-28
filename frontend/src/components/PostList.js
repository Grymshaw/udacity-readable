import PropTypes from 'prop-types';
import React from 'react';

import Post from './Post';

const PostList = ({ posts }) => (
  <div className="container">
    {posts.map(post => (
      <Post
        key={post.id}
        post={post}
      />
    ))}
  </div>
);

PostList.defaultProps = {
  posts: [],
};

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

// const getArrayFromStateProperty = (state, proerty) => (
//   Object.keys(state[property]).map(key => (
//     state[property][key]
//   ))
// );

// const mapStateToProps = state => ({
//   posts: getArrayFromStateProperty(state, 'posts'),
// });
// const mapDispatchToProps = dispatch => ({
//   onChange: category => dispatch(actions.changeCategory(category)),
// });

// const PostList = connect(mapStateToProps, mapDispatchToProps)(DropdownList);

export default PostList;
