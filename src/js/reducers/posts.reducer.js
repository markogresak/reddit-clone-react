import Immutable from 'seamless-immutable';
import {LOCATION_CHANGE} from 'react-router-redux';
import _ from 'lodash';

import {API_REQUEST_PENDING} from '../helpers/api-request';
import {
  GET_ALL_POSTS,
  GET_POST,
  RATE_POST,
  ADD_POST,
  RATE_COMMENT,
  ADD_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
} from '../actions/posts.action';
import {routeCodes} from '../routes';
import urlFromTemplate from '../helpers/url-from-template';

const initialState = Immutable({
  counter: 0,
  allPosts: [],
  currentPost: null,
  arePostsLoading: false,
  isPostViewLoading: false,
  addPostPending: false,
  newPostId: null,
  addCommentPending: false,
});

const posts = {
  [API_REQUEST_PENDING]: (state, action) => {
    if (action.nextAction === GET_ALL_POSTS) {
      return state.set('arePostsLoading', true);
    }
    if (action.nextAction === GET_POST) {
      return state.set('isPostViewLoading', true);
    }
    if (action.nextAction === ADD_POST) {
      return state.set('addPostPending', true);
    }
    if (action.nextAction === ADD_COMMENT) {
      return state.set('addCommentPending', true);
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
  [ADD_POST]: (state, action) => {
    return state.merge({
      addPostPending: false,
      newPostId: _.get(action, 'data.id'),
    });
  },
  [RATE_POST]: (state, action) => {
    if (action.isError) {
      return state;
    }

    const {post_id: postId} = action.data;
    const shouldUpdateCurrentPost = _.get(state, 'currentPost.id') === postId;
    const postIndex = _.findIndex(state.allPosts, {id: postId});

    const updatedPostData = {
      rating: action.data.post_rating,
      user_post_rating: action.data.rating,
    };

    let nextState = state;
    if (postIndex >= 0) {
      const postPath = ['allPosts', postIndex];
      nextState = _.reduce(updatedPostData, (nextState, val, key) => nextState.setIn([...postPath, key], val), nextState);
    }

    return nextState.merge({
      ...(shouldUpdateCurrentPost && {
        currentPost: state.currentPost.merge(updatedPostData),
      }),
    });
  },
  [RATE_COMMENT]: (state, action) => {
    if (action.isError || !state.currentPost) {
      return state;
    }

    const commentIndex = _.findIndex(state.currentPost.comments, {id: action.data.comment_id});

    if (commentIndex === -1) {
      return state;
    }

    const pathToComment = ['currentPost', 'comments', commentIndex];

    return state
      .setIn([...pathToComment, 'user_comment_rating'], action.data.rating)
      .setIn([...pathToComment, 'rating'], action.data.comment_rating);
  },
  [ADD_COMMENT]: (state, action) => {
    if (action.isError || !state.currentPost) {
      return state;
    }

    return state.merge({
      addCommentPending: false,
      currentPost: state.currentPost.merge({
        comments: [action.data, ...state.currentPost.comments],
      }),
    });
  },
  [EDIT_COMMENT]: (state, action) => {
    if (action.isError || !state.currentPost) {
      return state;
    }

    const commentIndex = _.findIndex(state.currentPost.comments, {id: action.data.id});

    if (commentIndex === -1) {
      return state;
    }

    return state.set('addCommentPending', false)
      .setIn(['currentPost', 'comments', commentIndex], action.data);
  },
  [DELETE_COMMENT]: (state, action) => {
    if (action.isError) {
      return state;
    }
    const removedCommentId = action.metadata.commentId;

    return state.merge({
      currentPost: state.currentPost.merge({
        comments: state.currentPost.comments.filter(c => c.id !== removedCommentId),
      }),
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
