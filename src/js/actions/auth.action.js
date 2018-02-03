import {login, register} from '../endpoints';
import apiRequest, {methods} from '../helpers/api-request';

export const LOGIN_PROCESSED = 'LOGIN_PROCESSED';
export const REGISTER_PROCESSED = 'REGISTER_PROCESSED';

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

export function submitRegister(newUserData) {
  return apiRequest({
    endpoint: register(),
    method: methods.POST,
    nextAction: REGISTER_PROCESSED,
    data: {
      user: newUserData,
    },
  });
}
