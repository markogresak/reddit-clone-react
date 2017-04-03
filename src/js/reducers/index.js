import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import posts from './posts.reducer';

export default combineReducers({
  posts,
  router: routerReducer,
});
