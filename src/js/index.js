// Load Polyfills
import 'babel-polyfill';
import 'whatwg-fetch';

import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import createHistory from 'history/createBrowserHistory';
import {AppContainer} from 'react-hot-loader';
import {injectGlobal} from 'styled-components';
import styledNormalize from 'styled-normalize';

import getMiddleware from './middleware';
import rootReducer from './reducers';
import RootContainer from './components/RootContainer';
import {linkColor} from './style-vars';

const history = createHistory();
const store = createStore(rootReducer, getMiddleware({history}));

function globalStyles() {
  return injectGlobal`
    ${styledNormalize}

    body {
      font-family: sans-serif;
    }

    a {
      text-decoration: none;
      color: ${linkColor};

      &:not(.title):hover {
        text-decoration: underline;
      }
    }
  `;
}

const render = () => {
  ReactDOM.render(
    <AppContainer>
      <RootContainer store={store} history={history} />
    </AppContainer>,
    document.getElementById('root')
  );
};

globalStyles();
render();

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept(['./components/RootContainer', './reducers'], () => {
    store.replaceReducer(rootReducer);
    render();
  });
}

export const getStore = () => store;
