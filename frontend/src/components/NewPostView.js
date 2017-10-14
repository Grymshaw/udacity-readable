import React from 'react';
// import { Link } from 'react-router-dom';

import Navigation from './Navigation';
import NewPostFormContainer from './NewPostFormContainer';

const NewPostView = ({ match }) => (
  <div>
    <Navigation match={match} />
    <div className="page">
      <NewPostFormContainer category="" />
    </div>
  </div>
);

export default NewPostView;
