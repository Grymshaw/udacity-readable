/* eslint "react/jsx-filename-extension": 0 */
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import './CommentList.css';
import CommentContainer from './CommentContainer';

class CommentList extends Component {
  componentDidMount() {
    this.props.onMount();
  }

  render() {
    const { comments, sortOrder } = this.props;
    const orderedComments = Object.keys(comments)
      .map(key => comments[key])
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
      <div className="comment-list">
        <h3>Comments:</h3>
        {orderedComments.map(comment => <CommentContainer key={comment.id} comment={comment} />)}
      </div>
    );
  }
}

CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object),
  onMount: PropTypes.func,
  sortOrder: PropTypes.string,
};

CommentList.defaultProps = {
  comments: [],
  onMount: () => {},
  sortOrder: '',
};

export default CommentList;
