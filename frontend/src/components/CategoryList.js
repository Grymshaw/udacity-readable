import { connect } from 'react-redux';
import { push } from 'react-router-redux';

// import * as navActions from '../actions/navigation';
import * as categoryActions from '../actions/categories';
import DropdownList from './DropdownList';

const mapDispatchToProps = dispatch => ({
  fetchData: () => categoryActions.fetchAllCategories()(dispatch),
  onChange: category => dispatch(push(category)),
  // onChange: category => dispatch(navActions.changeCategory(category)),
});

const mapStateToProps = state => ({
  // categories nested in state b/c of combineReducers()
  list: ['View all', ...(state.categories.categories)],
});

export default connect(mapStateToProps, mapDispatchToProps)(DropdownList);
