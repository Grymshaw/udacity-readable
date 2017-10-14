/* eslint "react/jsx-filename-extension": 0 */
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import './NewCommentForm.css';

class NewCommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      author: '',
      body: '',
    };
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleBodyChange = this.handleBodyChange.bind(this);
  }

  handleAuthorChange(e) {
    this.setState({ author: e.target.value });
  }

  handleBodyChange(e) {
    this.setState({ body: e.target.value });
  }

  handleSubmit(e) {
    const { author, body } = this.state;
    e.preventDefault();
    this.props.onSubmit({ author, body });
    this.setState({ author: '', body: '' });
  }

  render() {
    return (
      <form
        className="comment-form"
        onSubmit={e => this.handleSubmit(e)}
      >
        <h3>Add your comment</h3>
        <label htmlFor="name">
          Your name:
          <br />
          <input
            className="comment-form__input comment-form__input--text"
            type="text"
            value={this.state.author}
            onChange={e => this.handleAuthorChange(e)}
            name="name"
          />
        </label>
        <br />
        <br />
        <label htmlFor="body">
          Comment:
          <br />
          <textarea
            className="comment-form__input comment-form__input--textarea"
            required
            value={this.state.body}
            onChange={e => this.handleBodyChange(e)}
            name="body"
          />
        </label>
        <br />
        <br />
        <button
          className="comment-form__button comment-form__button--submit"
          type="submit"
        >
          Add comment
        </button>
      </form>
    );
  }
}

NewCommentForm.propTypes = {
  onSubmit: PropTypes.func,
};

NewCommentForm.defaultProps = {
  onSubmit: () => {},
};

export default NewCommentForm;
