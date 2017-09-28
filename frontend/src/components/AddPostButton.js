import { connect } from 'react-redux';
import { push } from 'react-router-redux';

// import * as actions from '../actions/navigation';
import Button from './Button';

const mapDispatchToProps = dispatch => ({
  onClick: () => dispatch(push('/new')),
  // addPost: () => dispatch(actions.addNewPost()),
});

export default connect(null, mapDispatchToProps)(Button);
