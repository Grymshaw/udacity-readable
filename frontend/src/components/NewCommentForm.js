/* eslint "react/jsx-filename-extension": 0 */
import PropTypes from 'prop-types';
import React, { Component } from 'react';

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
      <form onSubmit={e => this.handleSubmit(e)}>
        <label htmlFor="name">
          Your name:
          <br />
          <input
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
            required
            value={this.state.body}
            onChange={e => this.handleBodyChange(e)}
            name="body"
          />
        </label>
        <br />
        <br />
        <button type="submit">Add comment</button>
      </form>
    );
  }
}

// const NewCommentForm = ({ onSubmit }) => {
//   let author;
//   let body;

//   const getData = () => ({
//     author: author.value,
//     body: body.value,
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const comment = getData();
//     onSubmit(comment);
//   };

//   return (
//     <form onSubmit={e => handleSubmit(e)}>
//       <label htmlFor="name">
//         Your name:
//         <br />
//         <input type="text" ref={(input) => { author = input; }} name="name" />
//       </label>
//       <br />
//       <br />
//       <label htmlFor="body">
//         Comment:
//         <br />
//         <textarea required ref={(input) => { body = input; }} name="body" />
//       </label>
//       <br />
//       <br />
//       <button type="submit">Add comment</button>
//     </form>
//   );
// };

NewCommentForm.propTypes = {
  onSubmit: PropTypes.func,
};

NewCommentForm.defaultProps = {
  onSubmit: () => {},
};

export default NewCommentForm;
