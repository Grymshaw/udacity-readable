import React from 'react';
import { Link } from 'react-router-dom';

import './Navigation.css';
import AddPostButton from './AddPostButton';
import CategoryList from './CategoryList';
import PrimaryNav from './PrimaryNav';
import SortOrderList from './SortOrderList';
import Subnav from './Subnav';

const Navigation = ({ match }) => {
  // prevent CategoryList value change if on PostDetailsView
  let category;
  if (!match.params.id) category = match.params.category;
  else category = '';

  return (
    <div>
      <PrimaryNav>
        <h3><Link to="/" className="nav-brand">Readable</Link></h3>
      </PrimaryNav>
      <Subnav>
        <AddPostButton className="add-post-button">Add post +</AddPostButton>
        <div>
          <SortOrderList />
          <CategoryList category={category} />
        </div>
      </Subnav>
    </div>
  );
};

export default Navigation;
