import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';

import App from './components/App';
import { history, store } from './store';

import './index.css';
import '../node_modules/normalize.css/normalize.css';

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Route exact path="/">
          <App />
        </Route>
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);
