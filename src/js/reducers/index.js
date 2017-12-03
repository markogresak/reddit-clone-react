import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import posts from './posts.reducer';
import auth from './auth.reducer';
import user from './user.reducer';

export default combineReducers({
  posts,
  auth,
  user,
  router: routerReducer,
});
