import Immutable from 'seamless-immutable';
import _ from 'lodash';

import { API_REQUEST_PENDING } from '../helpers/api-request';
import { LOGIN_PROCESSED, REGISTER_PROCESSED } from '../actions/auth.action';

const initialState = Immutable({
  isLoginLoading: false,
  loginErrors: [],
  isRegisterLoading: false,
  registerErrors: [],
  registerSuccess: false,
});

function mapErrors(action) {
  return _.flatMap(_.first(action.errors), (errs, key) => _.map(errs, e => ({ message: `${key} ${e}` })));
}

const auth = {
  [API_REQUEST_PENDING]: (state, action) => {
    if (action.nextAction === LOGIN_PROCESSED) {
      return state.set('isLoginLoading', true);
    }
    if (action.nextAction === REGISTER_PROCESSED) {
      return state.set('isRegisterLoading', true);
    }
    return state;
  },
  [LOGIN_PROCESSED]: (state, action) => {
    return state.merge({
      isLoginLoading: false,
      loginErrors: action.errors || [],
    });
  },
  [REGISTER_PROCESSED]: (state, action) => {
    return state.merge({
      isRegisterLoading: false,
      registerErrors: mapErrors(action),
      registerSuccess: Boolean(_.get(action, 'data.id')),
    });
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = auth[action.type];
  return fn ? fn(state, action) : state;
}
