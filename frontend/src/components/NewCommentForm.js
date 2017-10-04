/* eslint "react/jsx-filename-extension": 0 */
import PropTypes from 'prop-types';
import React from 'react';


const NewCommentForm = ({ onSubmit }) => {
  let author;
  let body;

  const getData = () => ({
    author: author.value,
    body: body.value,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const comment = getData();
    console.log(comment);
    onSubmit(comment);
  };

  return (
    <form onSubmit={e => handleSubmit(e)}>
      <label htmlFor="name">
        Your name:
        <br />
        <input type="text" ref={(input) => { author = input; }} name="name" />
      </label>
      <br />
      <br />
      <label htmlFor="body">
        Comment:
        <br />
        <textarea required ref={(input) => { body = input; }} name="body" />
      </label>
      <br />
      <br />
      <button type="submit">Add comment</button>
    </form>
  );
};

NewCommentForm.propTypes = {
  onSubmit: PropTypes.func,
};

NewCommentForm.defaultProps = {
  onSubmit: () => {},
};

export default NewCommentForm;
