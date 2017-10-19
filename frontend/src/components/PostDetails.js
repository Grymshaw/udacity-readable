/* eslint "react/jsx-filename-extension": 0 */
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import './PostDetails.css';
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
    const { id, onMount, post } = this.props;
    onMount(id)
      .then(() => this.setState({ body: post.body, title: post.title }));
  }

  handleBodyChange(e) {
    this.setState({ body: e.target.value });
  }

  handleTitleChange(e) {
    this.setState({ title: e.target.value });
  }

  render() {
    const { isEditing, isRequestPending, onDelete, onEdit,
      onEditCancel, onEditSubmit, post } = this.props;

    return (
      <div>
        {(isRequestPending)
          ? <p>Loading...</p>
          : <div className="post-details">
            {isEditing
              ? <form className="edit-form">
                <label htmlFor="title">Title</label>
                <input
                  className="edit-form__input edit-form__input--text"
                  name="title"
                  type="text"
                  value={this.state.title}
                  onChange={e => this.handleTitleChange(e)}
                />
                <br />
                <label htmlFor="body">Body</label>
                <textarea
                  className="edit-form__input edit-form__input--textarea"
                  name="body"
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
                <div className="post-title post-title--details">{post.title}</div>
                <div className="post-subtitle">
                  {post.voteScore} point{post.voteScore === 1 ? '' : 's'} by {post.author} ({moment(post.timestamp).fromNow()})
                  <br />
                  in {post.category}
                </div>
                <div className="post-body">
                  {post.body}
                </div>

                <div className="post-actions--details">
                  <PostVotingContainer postId={post.id} />
                  <div>
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
        }
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
