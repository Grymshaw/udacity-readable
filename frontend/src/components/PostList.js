/* eslint "react/jsx-filename-extension": 0 */
import PropTypes from 'prop-types';
import React from 'react';

import Post from './Post';

class PostList extends React.Component {
  componentDidMount() {
    this.props.onMount();
  }

  render() {
    const { onPostClick, posts } = this.props;
    return posts
      ? <div style={{ width: '90%', margin: '0 auto' }}>
        {posts.map(post => (
          <Post
            key={post.id}
            onPostClick={onPostClick}
            post={post}
          />
        ))}
      </div>
      : null;
  }
}

PostList.defaultProps = {
  onMount: () => {},
  onPostClick: () => {},
  posts: [],
};

PostList.propTypes = {
  onMount: PropTypes.func,
  onPostClick: PropTypes.func,
  posts: PropTypes.arrayOf(PropTypes.object),
};

export default PostList;
