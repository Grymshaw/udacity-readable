import PropTypes from 'prop-types';
import React from 'react';

import Post from './Post';

class PostList extends React.Component {
  componentDidMount() {
    this.props.onMount();
  }
  render() {
    const { posts } = this.props;
    return posts
      ? <div className="container">
        {posts.map(post => (
          <Post
            key={post.id}
            post={post}
          />
        ))}
      </div>
      : null;
  }
}

// const PostList = ({ posts }) => (
//   <div className="container">
//     {posts.map(post => (
//       <Post
//         key={post.id}
//         post={post}
//       />
//     ))}
//   </div>
// );

PostList.defaultProps = {
  onMount: () => {},
  posts: [],
};

PostList.propTypes = {
  onMount: PropTypes.func,
  posts: PropTypes.arrayOf(PropTypes.object),
};

export default PostList;
