// Load Polyfills
import 'babel-polyfill';
import 'whatwg-fetch';

import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import createHistory from 'history/createBrowserHistory';
import {AppContainer} from 'react-hot-loader';

import getMiddleware from './middleware';
import rootReducer from './reducers';
import RootContainer from './components/RootContainer';

const history = createHistory();
const store = createStore(rootReducer, getMiddleware({history}));

const render = () => {
  ReactDOM.render(
    <AppContainer>
      <RootContainer store={store} history={history} />
    </AppContainer>,
    document.getElementById('root')
  );
};

render();

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept(['./components/RootContainer', './reducers'], () => {
    store.replaceReducer(rootReducer);
    render();
  });
}

export const getStore = () => store;
