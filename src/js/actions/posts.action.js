import {posts, comments, ratePost, rateComment} from '../endpoints';
import apiRequest, {methods} from '../helpers/api-request';

export const GET_ALL_POSTS = 'GET_ALL_POSTS';
export const GET_POST = 'GET_POST';
export const RATE_POST = 'RATE_POST';
export const ADD_POST = 'ADD_POST';
export const RATE_COMMENT = 'RATE_COMMENT';
export const ADD_COMMENT = 'ADD_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';


export const POST_RATE_UP = 1;
export const POST_RATE_DOWN = -1;

export function fetchAllPosts() {
  return apiRequest({
    endpoint: posts(),
    method: methods.GET,
    nextAction: GET_ALL_POSTS,
  });
}

export function addRatingButtons({id, rating}) {
  return apiRequest({
    endpoint: ratePost(id),
    method: methods.PUT,
    data: {
      post_rating: {
        rating,
      },
    },
    nextAction: RATE_POST,
  });
}

export function fetchPost(postId) {
  return apiRequest({
    endpoint: posts(postId),
    method: methods.GET,
    nextAction: GET_POST,
  });
}

export function addPost(postData) {
  return apiRequest({
    endpoint: posts(),
    method: methods.POST,
    nextAction: ADD_POST,
    data: {
      post: postData,
    },
  });
}

export function addCommentRating({id, rating}) {
  return apiRequest({
    endpoint: rateComment(id),
    method: methods.PUT,
    data: {
      comment_rating: {
        rating,
      },
    },
    nextAction: RATE_COMMENT,
  });
}

export function addOrEditComment({commentId, postId, text, parentCommentId}) {
  return apiRequest({
    endpoint: comments(commentId),
    method: commentId ? methods.PATCH : methods.POST,
    data: {
      comment: {
        post_id: postId,
        text,
        parent_comment_id: parentCommentId,
      },
    },
    nextAction: commentId ? EDIT_COMMENT : ADD_COMMENT,
  });
}

export function deleteComment(id) {
  return apiRequest({
    endpoint: comments(id),
    method: methods.DELETE,
    nextAction: DELETE_COMMENT,
    metadata: {
      commentId: id,
    },
  });
}
