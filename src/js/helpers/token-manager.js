import {createStore} from 'store/src/store-engine';
import defaultStore from 'store';
import sessionStorageEngine from 'store/storages/sessionStorage';
import _ from 'lodash';

const sessionStorage = createStore([sessionStorageEngine], []);

const USER_TOKEN_KEY_NAME = 'USER_TOKEN';
const valueTypes = {
  userId: _.isNumber,
  username: _.isString,
  accessToken: _.isString,
};
const expectedKeys = _.sortBy(_.keys(valueTypes));

/**
 * Check if given data is in valid format.
 * @param  {object}  data Data to verify.
 * @return {Boolean}      True if data is object {accessToken, uid, client} where values are strings, false otherwise.
 */
function isTokenDataValid(data) {
  // Check that `data` includes all and only the expected keys and that the values are strings.
  return _.isEqual(expectedKeys, _.sortBy(_.keys(data))) && _.every(valueTypes, (checkFn, key) => checkFn(data[key]));
}

/**
 * Access user token using given store engine.
 */
function getUserTokenWithStore(store) {
  // The `store` will automatically deserialize object or return undefined if the key doesn't exist.
  const data = store.get(USER_TOKEN_KEY_NAME);
  return isTokenDataValid(data) ? data : undefined;
}

let store = getUserTokenWithStore(sessionStorage) ? sessionStorage : defaultStore;

export function setStorageEngine(useSessionStorage) {
  if (useSessionStorage) {
    store = sessionStorage;
  } else {
    store = defaultStore;
  }
}

/**
 * Retrieve user login data
 * @return {Object} Get user login data as object {accessToken} or undefined if retrieved token is not valid.
 */
export function getUserToken() {
  return getUserTokenWithStore(store);
}

/**
 * Store user login data in localStorage.
 * @param {string} accessToken 'jwt' from response.
 */
export function setUserToken(data) {
  if (!isTokenDataValid(data)) {
    throw new Error(`setUserToken 'data' is not valid. Expected keys: [${expectedKeys}], got: [${_.keys(data)}]`);
  }

  // The `store` will automatically serialize object.
  return store.set(USER_TOKEN_KEY_NAME, data);
}

export function hasUserToken() {
  return Boolean(getUserToken());
}

export function clearUserToken() {
  return store.remove(USER_TOKEN_KEY_NAME);
}
