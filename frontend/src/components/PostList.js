/* eslint "react/jsx-filename-extension": 0 */
import PropTypes from 'prop-types';
import React from 'react';

import PostContainer from './PostContainer';

class PostList extends React.Component {
  componentDidMount() {
    this.props.onMount();
  }

  render() {
    const { comments, onPostClick, posts, sortOrder } = this.props;

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

    // Function to count # of comments per post
    const commentCounts = Object.keys(comments)
      .map(key => comments[key])
      .reduce((acc, cur) => {
        acc[cur.parentId] ? acc[cur.parentId] += 1 : acc[cur.parentId] = 1;
        return acc;
      }, {});

    return (
      <div>
        {postsArray.map(post => (
          <PostContainer
            key={post.id}
            onPostClick={() => onPostClick(post)}
            post={post}
            commentCount={commentCounts[post.id]}
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
  sortOrder: '',
};

PostList.propTypes = {
  onMount: PropTypes.func,
  onPostClick: PropTypes.func,
  posts: PropTypes.arrayOf(PropTypes.object),
  sortOrder: PropTypes.string,
};

export default PostList;
