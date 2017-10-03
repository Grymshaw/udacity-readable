import React from 'react';
import 'whatwg-fetch';

import './App.css';
import PostListContainer from './PostListContainer';

const App = () => (
  <div className="page">
    <PostListContainer />
  </div>
);

export default App;
