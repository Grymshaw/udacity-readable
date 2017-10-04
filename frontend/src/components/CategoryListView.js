/* eslint "react/jsx-filename-extension": 0 */
import React from 'react';

import PostListContainer from './PostListContainer';

const CategoryListView = ({ match }) => (
  <div>
    <PostListContainer category={match.params.category} />
  </div>
);

export default CategoryListView;
