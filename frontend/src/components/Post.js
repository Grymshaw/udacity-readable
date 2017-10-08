/* eslint "react/jsx-filename-extension": 0 */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import moment from 'moment';

import PostVotingContainer from './PostVotingContainer';

class Post extends Component {
  constructor(props) {
    super(props);
    const { post } = props;
    this.state = {
      body: post.body,
      title: post.title,
    };
    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
  }

  handleBodyChange(e) {
    this.setState({ body: e.target.value });
  }

  handleTitleChange(e) {
    this.setState({ title: e.target.value });
  }

  render() {
    const { isEditing, onCancelEdit, onDelete, onEdit,
      onEditSubmit, onPostClick, post } = this.props;
    return (isEditing
      ? <form>
        <input
          type="text"
          value={this.state.title}
          onChange={e => this.handleTitleChange(e)}
        />
        <br />
        <textarea
          value={this.state.body}
          onChange={e => this.handleBodyChange(e)}
        />
        <br />
        <button
          className="edit-action edit-action--cancel"
          onClick={() => {
            onCancelEdit();
            this.setState({ body: post.body, title: post.title });
          }}
        >
          Cancel
        </button>
        <br />
        <button
          className="edit-action edit-action--submit"
          onClick={() => onEditSubmit({ body: this.state.body, title: this.state.title })}
        >
          Submit Changes
        </button>
      </form>
      : <div style={{ width: '100%' }}>
        <div
          className="post-title"
          onClick={() => onPostClick(post.id)}
          role="link"
          tabIndex={0}
        >
          {post.title}
        </div>
        <div className="post-footer">
          <PostVotingContainer postId={post.id} />
          {post.voteScore} points by {post.author} at {moment(post.timestamp).fromNow()}
          <br />
          Category: {post.category}
        </div>
        <div className="post-actions">
          <span
            className="post-action post-action--edit"
            onClick={onEdit}
            role="button"
            tabIndex={0}
          >
            Edit
          </span>
          <span
            className="post-action post-action--delete"
            onClick={onDelete}
            role="button"
            tabIndex={0}
          >
            Delete
          </span>
        </div>
      </div>
    );
  }
}

Post.propTypes = {
  isEditing: PropTypes.bool,
  onCancelEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  onEditSubmit: PropTypes.func,
  onPostClick: PropTypes.func,
  post: PropTypes.shape({
    id: PropTypes.string,
    author: PropTypes.string,
    body: PropTypes.string,
    category: PropTypes.string,
    title: PropTypes.string,
    timestamp: PropTypes.number,
    voteScore: PropTypes.nubmer,
  }).isRequired,
};

Post.defaultProps = {
  isEditing: false,
  onCancelEdit: () => {},
  onDelete: () => {},
  onEdit: () => {},
  onEditSubmit: () => {},
  onPostClick: () => {},
};

export default Post;
