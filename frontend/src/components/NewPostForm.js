/* eslint "react/jsx-filename-extension": 0 */
import PropTypes from 'prop-types';
import React from 'react';
import uuid from 'uuid/v4';

import DropdownList from './DropdownList';

const NewPostForm = ({ categories, onSubmit }) => {
  let category;
  let name;
  let body;
  let title;

  const getPost = () => ({
    id: uuid(),
    category: category.value,
    name: name.value,
    body: body.value,
    title: title.value,
    timestamp: Date.now(),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const post = getPost();
    onSubmit(post);
  };

  return (
    <form onSubmit={e => handleSubmit(e)}>
      <label htmlFor="title">
        Post Title:
        <br />
        <input
          name="title"
          ref={(input) => { title = input; }}
          type="text"
          required
        />
      </label>
      <br />
      <br />
      <label htmlFor="name">
        Your Name:
        <br />
        <input
          name="name"
          ref={(input) => { name = input; }}
          type="text"
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
          ref={(input) => { category = input; }}
          list={categories}
        />
      </label>
      <br />
      <br />
      <label htmlFor="body">
        Post:
        <br />
        <textarea
          name="body"
          ref={(input) => { body = input; }}
          required
        />
      </label>
      <br />
      <br />
      <button type="submit">Add post</button>
    </form>
  );
};

NewPostForm.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default NewPostForm;
