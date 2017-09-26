import { combineReducers } from 'redux';

import categories from './categories';
import comments from './comments';
// import navigation from './';
import posts from './posts';

export default combineReducers({ categories, comments, posts });
