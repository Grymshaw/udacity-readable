/* eslint "react/jsx-filename-extension": 0 */
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import PostVotingContainer from './PostVotingContainer';

class PostDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: props.post.body,
      title: props.post.title,
    };
    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
  }

  componentDidMount() {
    const { onMount, id } = this.props;
    onMount(id)
      .then(() => this.setState({ body: this.props.post.body, title: this.props.post.title }));
  }

  handleBodyChange(e) {
    this.setState({ body: e.target.value });
  }

  handleTitleChange(e) {
    this.setState({ title: e.target.value });
  }

  render() {
    const { isEditing, onDelete, onEdit, onEditCancel, onEditSubmit, post } = this.props;
    return (
      isEditing
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
              onEditCancel();
              // reset state to initial post
              this.setState({ body: post.body, title: post.title });
            }}
          >
            Cancel
          </button>
          <br />
          <button
            className="edit-action edit-action--submit"
            onClick={() => onEditSubmit({
              body: this.state.body,
              title: this.state.title,
            })}
          >
            Submit changes
          </button>
          <br />
        </form>
        : <div>
          <div className="post-title">{post.title}</div>
          <div className="post-subtitle">
            {post.voteScore} points by {post.author}
            <br />
            {moment(post.timestamp).fromNow()}
          </div>
          <div className="post-body">
            {post.body}
          </div>

          <div className="voting-actions voting-actions--post-detail">
            <PostVotingContainer postId={post.id} />
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

PostDetails.propTypes = {
  id: PropTypes.string,
  isEditing: PropTypes.bool,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  onEditCancel: PropTypes.func,
  onEditSubmit: PropTypes.func,
  onMount: PropTypes.func,
  post: PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
    voteScore: PropTypes.number,
    timestamp: PropTypes.number,
    body: PropTypes.string,
    id: PropTypes.string,
  }),
};

PostDetails.defaultProps = {
  id: '',
  isEditing: false,
  onDelete: () => {},
  onEdit: () => {},
  onEditCancel: () => {},
  onEditSubmit: () => {},
  onMount: () => {},
  post: {},
};

export default PostDetails;
