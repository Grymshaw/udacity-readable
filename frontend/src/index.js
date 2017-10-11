/* eslint "no-undef": 0 */
/* eslint "react/jsx-filename-extension": 0 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';

import App from './components/App';
import CategoryListView from './components/CategoryListView';
import NewPostView from './components/NewPostView';
import PostDetailsView from './components/PostDetailsView';

import { history, store } from './store';

import './index.css';
import '../node_modules/normalize.css/normalize.css';

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        {/* routes */}
        <Switch>
          <Route exact path="/" component={App} />
          <Route exact path="/new" component={NewPostView} />
          <Route exact path="/:category" component={CategoryListView} />
          <Route exact path="/:category/:id" component={PostDetailsView} />
        </Switch>
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);
