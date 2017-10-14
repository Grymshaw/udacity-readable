/* eslint "react/jsx-filename-extension": 0 */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import uuid from 'uuid/v4';

import DropdownList from './DropdownList';

class NewPostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: '',
      category: '',
      name: '',
      title: '',
    };
    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
  }

  getPost() {
    const { body, category, name, title } = this.state;
    return {
      id: uuid(),
      timestamp: Date.now(),
      body,
      category,
      author: name,
      title,
    };
  }

  handleBodyChange(e) {
    this.setState({ body: e.target.value });
  }

  handleCategoryChange(e) {
    this.setState({ category: e.target.value });
  }

  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }

  handleTitleChange(e) {
    this.setState({ title: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const post = this.getPost();
    this.props.onSubmit(post);
  }

  render() {
    const { categories } = this.props;
    return (
      <form onSubmit={e => this.handleSubmit(e)}>
        <h2>Add a post</h2>
        <label htmlFor="title">
          Post Title:
          <br />
          <input
            style={{ margin: 0 }}
            className="edit-form__input edit-form__input--text"
            name="title"
            type="text"
            value={this.state.title}
            onChange={e => this.handleTitleChange(e)}
            required
          />
        </label>
        <br />
        <br />
        <label htmlFor="name">
          Your Name:
          <br />
          <input
            style={{ margin: 0 }}
            className="edit-form__input edit-form__input--text"
            name="name"
            type="text"
            value={this.state.name}
            onChange={e => this.handleNameChange(e)}
          />
        </label>
        <br />
        <br />
        <label htmlFor="category">
          Post category:
          <br />
          <DropdownList
            name="category"
            isRequired={true}
            list={categories}
            value={this.state.category}
            onChange={e => this.handleCategoryChange(e)}
          />
        </label>
        <br />
        <br />
        <label htmlFor="body">
          Post:
          <br />
          <textarea
            style={{ margin: 0 }}
            className="edit-form__input edit-form__input--textarea"
            name="body"
            value={this.state.body}
            onChange={e => this.handleBodyChange(e)}
            required
          />
        </label>
        <br />
        <br />
        <button className="add-post-button" type="submit">Add post</button>
      </form>
    );
  }
}

NewPostForm.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default NewPostForm;
