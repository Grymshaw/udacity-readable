/* eslint "react/jsx-filename-extension": 0 */
import PropTypes from 'prop-types';
import moment from 'moment';
import React, { Component } from 'react';

import './Comment.css';
import CommentVotingContainer from './CommentVotingContainer';

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: props.comment.body,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ body: e.target.value });
  }

  render() {
    const { comment, isEditing, onDelete, onEdit, onEditCancel, onEditSubmit } = this.props;
    return (
      <div className="comment">
        {isEditing
          ? <form>
            <textarea className="edit-form__input edit-form__input--textarea" value={this.state.body} onChange={e => this.handleChange(e)} />
            <button
              className="edit-action edit-action--cancel"
              onClick={() => {
                onEditCancel();
                this.setState({ body: comment.body });
              }}
            >
              Cancel
            </button>
            <button
              className="edit-action edit-action--submit"
              onClick={() => {
                onEditSubmit({ body: this.state.body, timestamp: Date.now() });
              }}
            >
              Submit changes
            </button>
          </form>
          : <div>
            <p className="comment__body">{comment.body}</p>
            <div className="comment__footer">
              {comment.voteScore} points by {comment.author}
              <br />
              {moment(comment.timestamp).fromNow()}
            </div>
            <div className="comment-actions">
              <CommentVotingContainer commentId={comment.id} />
              <div style={{ height: '25px' }}>
                <span
                  onClick={(e) => {
                    e.preventDefault();
                    onEdit();
                  }}
                  className="comment-action comment-action--edit"
                  role="button"
                  tabIndex={0}
                >
                  Edit
                </span>
                <span
                  onClick={(e) => {
                    e.preventDefault();
                    onDelete();
                  }}
                  className="comment-action comment-action--delete"
                  role="button"
                  tabIndex={0}
                >
                  Delete
                </span>
              </div>
            </div>
          </div>}
      </div>
    );
  }
}

Comment.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.string,
    author: PropTypes.string,
    body: PropTypes.string,
    timestamp: PropTypes.number,
    voteScore: PropTypes.number,
  }).isRequired,
  isEditing: PropTypes.bool,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  onEditCancel: PropTypes.func,
  onEditSubmit: PropTypes.func,
};

Comment.defaultProps = {
  isEditing: false,
  onDelete: () => {},
  onEdit: () => {},
  onEditCancel: () => {},
  onEditSubmit: () => {},
};

export default Comment;
