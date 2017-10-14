import React from 'react';
import 'whatwg-fetch';

import './App.css';
import Navigation from './Navigation';
import PostListContainer from './PostListContainer';

const App = ({ match }) => (
  <div>
    <Navigation match={match} />
    <div className="page">
      <PostListContainer />
    </div>
  </div>
);

export default App;
