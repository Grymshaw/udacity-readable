/* eslint "no-undef": 0 */
/* eslint "react/jsx-filename-extension": 0 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import AddPostButton from './components/AddPostButton';
import App from './components/App';
import CategoryList from './components/CategoryList';
import CategoryListView from './components/CategoryListView';
import NewPostFormContainer from './components/NewPostFormContainer';
import PostDetailsView from './components/PostDetailsView';
import PrimaryNav from './components/PrimaryNav';
import SortOrderList from './components/SortOrderList';
import Subnav from './components/Subnav';

import { history, store } from './store';

import './index.css';
import '../node_modules/normalize.css/normalize.css';

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        {/* navigation displayed on all routes */}
        <PrimaryNav>
          <h3><Link to="/">Readable</Link></h3>
        </PrimaryNav>
        <Subnav>
          <AddPostButton>Add post +</AddPostButton>
          <div>
            <SortOrderList />
            <CategoryList />
          </div>
        </Subnav>
        {/* routes */}
        <Route exact path="/" component={App} />
        <Route path="/categories/:category" component={CategoryListView} />
        <Route path="/posts/:id" component={PostDetailsView} />
        <Route path="/new" component={NewPostFormContainer} />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);
