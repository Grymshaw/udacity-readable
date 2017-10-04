import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import * as postActions from '../actions/posts';
import * as categoryActions from '../actions/categories';
import DropdownList from './DropdownList';

const mapDispatchToProps = dispatch => ({
  fetchData: () => categoryActions.fetchAllCategories()(dispatch),
  onChange: (category) => {
    // check if category should lead to root path
    const path = category === '/'
      ? category
      : `/categories/${category}`;
    dispatch(push(path));
    // fetch category-related posts or all posts
    if (category !== '/') {
      postActions.fetchCategoryPosts(category)(dispatch);
    } else {
      postActions.fetchAllPosts()(dispatch);
    }
  },
});

const mapStateToProps = state => ({
  // categories nested in state b/c of combineReducers()
  list: [{ name: 'View all', value: '/' }, ...(state.categories.categories)],
});

export default connect(mapStateToProps, mapDispatchToProps)(DropdownList);
