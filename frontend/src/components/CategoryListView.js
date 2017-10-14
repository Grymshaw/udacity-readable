/* eslint "react/jsx-filename-extension": 0 */
import React from 'react';

import Navigation from './Navigation';
import PostListContainer from './PostListContainer';

const CategoryListView = ({ match }) => (
  <div>
    <Navigation match={match} />
    <div className="page">
      {/* add key property to force re-render when category param in url is different */}
      <PostListContainer key={match.params.category} category={match.params.category} />
    </div>
  </div>
);

export default CategoryListView;
