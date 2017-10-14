/* eslint "react/jsx-filename-extension": 0 */
import PropTypes from 'prop-types';
import React from 'react';

import PostContainer from './PostContainer';

class PostList extends React.Component {
  componentDidMount() {
    this.props.onMount();
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.category !== this.props.category) {
  //     this.props.onMount();
  //   }
  // }

  render() {
    const { onPostClick, posts, sortOrder } = this.props;
    // get array sorted in specified order
    const postsArray = Object.keys(posts)
      .map(key => posts[key])
      .sort((a, b) => {
        switch (sortOrder) {
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
      });

    return (
      <div>
        {postsArray.map(post => (
          <PostContainer
            key={post.id}
            onPostClick={() => onPostClick(post)}
            post={post}
          />
        ))}
      </div>
    );
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
