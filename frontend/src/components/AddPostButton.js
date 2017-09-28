import { connect } from 'react-redux';

import * as actions from '../actions/navigation';
import Button from './Button';

const mapDispatchToProps = dispatch => ({
  addPost: () => dispatch(actions.addNewPost()),
});

export default connect(null, mapDispatchToProps)(Button);
