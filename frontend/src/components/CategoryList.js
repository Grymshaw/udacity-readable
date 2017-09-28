import { connect } from 'react-redux';

import * as navActions from '../actions/navigation';
import * as categoryActions from '../actions/categories';
import DropdownList from './DropdownList';

const mapDispatchToProps = dispatch => ({
  fetchData: () => categoryActions.fetchAllCategories()(dispatch),
  onChange: category => dispatch(navActions.changeCategory(category)),
});

const mapStateToProps = state => ({
  list: state.categories.categories,
});

export default connect(mapStateToProps, mapDispatchToProps)(DropdownList);