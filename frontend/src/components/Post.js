/* eslint "react/jsx-filename-extension": 0 */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import moment from 'moment';

import './Post.css';
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
    const { commentCount, isEditing, onCancelEdit, onDelete, onEdit,
      onEditSubmit, onPostClick, post } = this.props;
    return (
      <div className="post">
        {isEditing
          ? <form className="edit-form">
            <label htmlFor="title">Title</label>
            <input
              name="title"
              type="text"
              className="edit-form__input edit-form__input--text"
              value={this.state.title}
              onChange={e => this.handleTitleChange(e)}
            />
            <br />
            <label htmlFor="body">Body</label>
            <textarea
              name="body"
              className="edit-form__input edit-form__input--textarea"
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
            <button
              className="edit-action edit-action--submit"
              onClick={() => onEditSubmit({ body: this.state.body, title: this.state.title })}
            >
              Submit Changes
            </button>
          </form>
          : <div>
            <div
              className="post-title post-title--list"
              onClick={() => onPostClick(post.id)}
              role="link"
              tabIndex={0}
            >
              {post.title}
            </div>
            <div className="post-footer">
              {post.voteScore} point{post.voteScore === 1 ? '' : 's'} by {post.author} ({moment(post.timestamp).fromNow()})
              <br />
              in {post.category}
              <br />
              {commentCount} comment{commentCount === 1 ? '' : 's'}
            </div>
            <div className="post-actions">
              <PostVotingContainer postId={post.id} />
              <div style={{ height: '100%' }}>
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
          </div>
        }
      </div>
    );
  }
}

Post.propTypes = {
  commentCount: PropTypes.number,
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
  commentCount: 0,
  isEditing: false,
  onCancelEdit: () => {},
  onDelete: () => {},
  onEdit: () => {},
  onEditSubmit: () => {},
  onPostClick: () => {},
};

export default Post;
