/* eslint "react/jsx-filename-extension": 0 */
import React from 'react';
import { Link } from 'react-router-dom';

import AddPostButton from './AddPostButton';
import CategoryList from './CategoryList';
import PostListContainer from './PostListContainer';
import PrimaryNav from './PrimaryNav';
import SortOrderList from './SortOrderList';
import Subnav from './Subnav';

const CategoryListView = ({ match }) => (
  <div>
    <PrimaryNav>
      <h3><Link to="/">Readable</Link></h3>
    </PrimaryNav>
    <Subnav>
      <AddPostButton>Add post +</AddPostButton>
      <div>
        <SortOrderList />
        <CategoryList category={match.params.category} />
      </div>
    </Subnav>
    <PostListContainer category={match.params.category} />
  </div>
);

export default CategoryListView;
