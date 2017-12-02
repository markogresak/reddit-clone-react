import {login} from '../endpoints';
import apiRequest, {methods} from '../helpers/api-request';

export const LOGIN_PROCESSED = 'LOGIN_PROCESSED';

export function submitLogin(userData) {
  const {rememberMe, ...data} = userData;

  return apiRequest({
    endpoint: login(),
    method: methods.POST,
    nextAction: LOGIN_PROCESSED,
    data,
    metadata: {
      useSessionStorage: !rememberMe,
    },
  });
}
