import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import * as actions from '../actions/posts';
import NewPostForm from './NewPostForm';

const mapDispatchToProps = dispatch => ({
  onSubmit: (post) => {
    actions.addPost(post)(dispatch);
    dispatch(push('/'));
  },
});

const mapStateToProps = state => ({
  categories: state.categories.categories,
});

export default connect(mapStateToProps, mapDispatchToProps)(NewPostForm);
