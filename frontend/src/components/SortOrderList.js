import { connect } from 'react-redux';

import * as actions from '../actions/sortOrder';
import DropdownList from './DropdownList';

const sortOrders = [
  { name: 'Vote count (ascending)', value: 'votesAscending' },
  { name: 'Vote count (descending)', value: 'votesDescending' },
  { name: 'Recent first', value: 'recentFirst' },
  { name: 'Oldest frist', value: 'oldestFirst' },
];

const mapDispatchToProps = dispatch => ({
  onChange: e => dispatch(actions.setSortOrder(e.target.value)),
  list: sortOrders,
});

const mapStateToProps = state => ({
  value: state.sortOrder.order,
});

export default connect(mapStateToProps, mapDispatchToProps)(DropdownList);
