import Immutable from 'seamless-immutable';

import {API_REQUEST_PENDING} from '../helpers/api-request';
import {
  GET_ALL_POSTS,
} from '../actions/posts.action';

const initialState = Immutable({
  counter: 0,
  allPosts: [],
  arePostsLoading: false,
});

const posts = {
  [API_REQUEST_PENDING]: (state, action) => {
    if (action.nextAction === GET_ALL_POSTS) {
      return state.set('arePostsLoading', true);
    }
    return state;
  },
  [GET_ALL_POSTS]: (state, action) => {
    return state.merge({
      allPosts: action.isError ? [] : action.data,
      arePostsLoading: false,
    });
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = posts[action.type];
  return fn ? fn(state, action) : state;
}
