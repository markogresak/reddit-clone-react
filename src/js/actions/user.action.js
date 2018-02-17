import { users } from '../endpoints';
import apiRequest, { methods } from '../helpers/api-request';

export const FETCH_USER = 'FETCH_USER';

export function fetchUser(id) {
  return apiRequest({
    endpoint: users(id),
    method: methods.GET,
    nextAction: FETCH_USER,
  });
}
