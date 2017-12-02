import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import posts from './posts.reducer';
import auth from './auth.reducer';

export default combineReducers({
  posts,
  auth,
  router: routerReducer,
});
