import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';

import AddPostButton from './components/AddPostButton';
import App from './components/App';
import CategoryList from './components/CategoryList';
import PrimaryNav from './components/PrimaryNav';
import SortOrderList from './components/SortOrderList';
import Subnav from './components/Subnav';

import { history, store } from './store';

import './index.css';
import '../node_modules/normalize.css/normalize.css';

console.log(store.getState());

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        {/* navigation displayed on all routes */}
        <PrimaryNav>
          <h3>Readable</h3>
        </PrimaryNav>
        <Subnav>
          <AddPostButton>Add post +</AddPostButton>
          <div>
            <SortOrderList />
            <CategoryList />
          </div>
        </Subnav>
        <Route exact path="/" component={App} />
        <Route path="/new" render={() => <h1>testing</h1>} />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);
