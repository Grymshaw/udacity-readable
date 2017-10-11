import React from 'react';
import 'whatwg-fetch';
import { Link } from 'react-router-dom';

import './App.css';
import AddPostButton from './AddPostButton';
import CategoryList from './CategoryList';
import PostListContainer from './PostListContainer';
import PrimaryNav from './PrimaryNav';
import SortOrderList from './SortOrderList';
import Subnav from './Subnav';

const App = ({ match }) => (
  <div className="page">
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
    <PostListContainer />
  </div>
);

export default App;
