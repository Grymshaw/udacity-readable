import { connect } from 'react-redux';
import { push } from 'react-router-redux';

// import * as actions from '../actions/navigation';
import Button from './Button';

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => dispatch(push('/new')),
  className: ownProps.className,
});

export default connect(null, mapDispatchToProps)(Button);
