import React from 'react';
import { Link } from 'react-router-dom';

import AddPostButton from './AddPostButton';
import CategoryList from './CategoryList';
import NewPostFormContainer from './NewPostFormContainer';
import PrimaryNav from './PrimaryNav';
import Subnav from './Subnav';

const NewPostView = ({ match }) => (
  <div>
    <PrimaryNav>
      <h3><Link to="/">Readable</Link></h3>
    </PrimaryNav>
    <Subnav>
      <AddPostButton>Add post +</AddPostButton>
      <div>
        <CategoryList category={match.params.category} />
      </div>
    </Subnav>
    <NewPostFormContainer />
  </div>
);

export default NewPostView;
