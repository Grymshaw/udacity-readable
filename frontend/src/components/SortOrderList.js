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
  onChange: sortOrder => dispatch(actions.setSortOrder(sortOrder)),
  list: sortOrders,
});

export default connect(null, mapDispatchToProps)(DropdownList);
