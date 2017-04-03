import {posts} from '../endpoints';
import apiRequest from '../helpers/api-request';

export const GET_ALL_POSTS = 'GET_ALL_POSTS';
export const RATE_POST = 'RATE_POST';


export const POST_RATE_UP = 1;
export const POST_RATE_DOWN = -1;

export function fetchAllPosts() {
  return apiRequest({
    endpoint: posts(),
    nextAction: GET_ALL_POSTS,
  });
}

export function addPostRating({postId, rating}) {
  return apiRequest({
    endpoint: posts(postId),
    requestParams: {
      method: 'PUT',
      data: {
        rating,
      },
    },
    nextAction: RATE_POST,
  });
}
