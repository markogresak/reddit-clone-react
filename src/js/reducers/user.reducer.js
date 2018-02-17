import Immutable from 'seamless-immutable';
import _ from 'lodash';

import { API_REQUEST_PENDING } from '../helpers/api-request';
import { FETCH_USER } from '../actions/user.action';
import { RATE_POST, RATE_COMMENT } from '../actions/posts.action';

const initialState = Immutable({
  isUserLoading: false,
  currentUser: {
    posts: [],
    comments: [],
  },
});

const user = {
  [API_REQUEST_PENDING]: (state, action) => {
    if (action.nextAction === FETCH_USER) {
      return state.set('isUserLoading', true);
    }
    return state;
  },
  [FETCH_USER]: (state, action) => {
    return state.merge({
      isUserLoading: false,
      currentUser: action.data,
    });
  },
  [RATE_POST]: (state, action) => {
    if (action.isError) {
      return state;
    }

    const postIndex = _.findIndex(state.currentUser.posts, {
      id: action.data.post_id,
    });
    if (postIndex === -1) {
      return state;
    }

    const postPath = ['currentUser', 'posts', postIndex];

    return state
      .setIn([...postPath, 'rating'], action.data.post_rating)
      .setIn([...postPath, 'user_post_rating'], action.data.rating);
  },
  [RATE_COMMENT]: (state, action) => {
    if (action.isError) {
      return state;
    }

    const commentIndex = _.findIndex(state.currentUser.comments, {
      id: action.data.comment_id,
    });
    if (commentIndex === -1) {
      return state;
    }

    const pathToComment = ['currentUser', 'comments', commentIndex];

    return state
      .setIn([...pathToComment, 'user_comment_rating'], action.data.rating)
      .setIn([...pathToComment, 'rating'], action.data.comment_rating);
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = user[action.type];
  return fn ? fn(state, action) : state;
}
