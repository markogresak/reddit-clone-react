import Immutable from 'seamless-immutable';
import {LOCATION_CHANGE} from 'react-router-redux';
import _ from 'lodash';

import {API_REQUEST_PENDING} from '../helpers/api-request';
import {
  GET_ALL_POSTS,
  GET_POST,
} from '../actions/posts.action';
import {routeCodes} from '../routes';
import urlFromTemplate from '../helpers/url-from-template';

const initialState = Immutable({
  counter: 0,
  allPosts: [],
  currentPost: null,
  arePostsLoading: false,
  isPostViewLoading: false,
});

const posts = {
  [API_REQUEST_PENDING]: (state, action) => {
    if (action.nextAction === GET_ALL_POSTS) {
      return state.set('arePostsLoading', true);
    }
    if (action.nextAction === GET_POST) {
      return state.set('isPostViewLoading', true);
    }
    return state;
  },
  [GET_ALL_POSTS]: (state, action) => {
    return state.merge({
      allPosts: action.isError ? [] : action.data,
      arePostsLoading: false,
    });
  },
  [GET_POST]: (state, action) => {
    return state.merge({
      currentPost: action.isError ? null : action.data,
      isPostViewLoading: false,
    });
  },
  [LOCATION_CHANGE]: (state, action) => {
    const currentPostId = _.get(state, 'currentPost.id');
    if (currentPostId && _.get(action, 'payload.pathname') === urlFromTemplate(routeCodes.POST, {id: currentPostId})) {
      return state;
    }
    return state.set('currentPost', null);
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = posts[action.type];
  return fn ? fn(state, action) : state;
}
