/* eslint "react/jsx-filename-extension": 0 */
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Comment from './Comment';

class CommentList extends Component {
  componentDidMount() {
    this.props.onMount();
  }

  render() {
    const { comments } = this.props;
    return (
      <div className="comment-list">
        {comments.map(comment => <Comment key={comment.id} comment={comment} />)}
      </div>
    );
  }
}

CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object),
  onMount: PropTypes.func,
};

CommentList.defaultProps = {
  comments: [],
  onMount: () => {},
};

export default CommentList;
