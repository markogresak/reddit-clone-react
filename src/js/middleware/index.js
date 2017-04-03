import _ from 'lodash';
import thunk from 'redux-thunk';
import {compose, applyMiddleware} from 'redux';
import {routerMiddleware} from 'react-router-redux';

import apiRequest from './api-request';

const isProduction = process.env.NODE_ENV !== 'development';

const devMiddleware = [];

if (!isProduction) {
  /* eslint-disable global-require */
  const apiErrorLogger = require('./dev/api-request-error-logger').default;
  const {createLogger} = require('redux-logger');
  /* eslint-enable */
  devMiddleware.push(...[createLogger({collapsed: true}), apiErrorLogger]);
}

// Exporting as an array so it can be easily used inside configureStore
export default function getMiddleware({history}) {
  const historyMiddleware = routerMiddleware(history);
  const middleware = [
    thunk,
    historyMiddleware,
    apiRequest,
    ...devMiddleware,
  ];
  // configure redux DevTools (via Redux Devtools extension) if available
  const composeEnhancers = _.get(window, '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__', compose);
  return composeEnhancers(applyMiddleware(...middleware));
}
