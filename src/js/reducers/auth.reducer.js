import Immutable from 'seamless-immutable';

import {API_REQUEST_PENDING} from '../helpers/api-request';
import {LOGIN_PROCESSED} from '../actions/auth.action';

const initialState = Immutable({
  isLoginLoading: false,
  loginErrors: [],
});

const auth = {
  [API_REQUEST_PENDING]: (state, action) => {
    if (action.nextAction === LOGIN_PROCESSED) {
      return state.set('isLoginLoading', true);
    }
    return state;
  },
  [LOGIN_PROCESSED]: (state, action) => {
    return state.merge({
      isLoginLoading: false,
      loginErrors: action.errors || [],
    });
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = auth[action.type];
  return fn ? fn(state, action) : state;
}
