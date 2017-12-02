import {posts, ratePost, rateComment} from '../endpoints';
import apiRequest, {methods} from '../helpers/api-request';

export const GET_ALL_POSTS = 'GET_ALL_POSTS';
export const GET_POST = 'GET_POST';
export const RATE_POST = 'RATE_POST';
export const RATE_COMMENT = 'RATE_COMMENT';


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
