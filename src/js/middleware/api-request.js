import queryString from 'query-string';
import _ from 'lodash';

import {API_REQUEST, API_REQUEST_PENDING, methods} from '../helpers/api-request';
import {setStorageEngine, getUserToken, setUserToken} from '../helpers/token-manager';

function processResponse(response) {
  /**
   * handle 204 responses (empty body response => invalid JSON)
   * @type {Promise}
   */
  const jsonResponse = response.status === 204 ? Promise.resolve({}) : response.json();

  return jsonResponse
    // Map response to always have shape {data, errors}
    .then(json => {
      const payload = _.has(json, 'data') ? json : {data: json};

      // Try to parse user data from payload (if login) and store it.
      const userId = _.get(payload, 'data.user.id');
      const username = _.get(payload, 'data.user.username');
      const accessToken = _.get(payload, 'data.jwt');

      if (_.isNumber(userId) && _.isString(username) && _.isString(accessToken)) {
        setUserToken({
          userId,
          username,
          accessToken,
        });
      }

      if (_.has(payload, 'data.error')) {
        return {...payload, errors: _.castArray(payload.data.error)};
      }
      if (_.has(payload, 'data.errors')) {
        return {...payload, errors: _.castArray(payload.data.errors)};
      }
      return payload;
    });
}

/**
 * Send request to the endpoint with given requestParams.
 * @param  {string} endpoint  Url relative to API base path.
 * @param  {string} method    Optional request HTTP method, defaults to GET.
 * @param  {string} data      Optional request data or GET req params, defaults to empty object (no additional params).
 * @return {Promise}          Promise resolving with either response data or error message string.
 */
function performRequest({endpoint, method, data = {}, isExternalUrl}) {
  if (!_.isString(endpoint)) {
    throw new Error('"endpoint" argument of performRequest function of api-request middleware is not valid');
  }

  if (!_.isString(method)) {
    throw new Error('"method" argument of performRequest function of api-request middleware is not valid');
  }

  // Prepare headers variable.
  const headers = new Headers();
  headers.append('Accept', 'application/json');

  // Add auth token if available.
  const userToken = getUserToken();
  const includeCredentials = !isExternalUrl;
  if (userToken) {
    headers.append('Authorization', `Bearer ${userToken.accessToken}`);
  }

  // if data is provided: when using GET method, serialize it to query string, otherwise pass it as request body.
  const params = (!_.isEmpty(data) && method === methods.GET) ? `?${queryString.stringify(data)}` : '';

  let payload;
  if (method !== methods.GET) {
    if (data instanceof FormData || _.some(data, (object) => object instanceof FormData)) {
      // Leave the content type to the browser - fetch has problems with boundary if 'multipart/form-data' is set as type manually.
      payload = {body: data};
    } else {
      headers.append('Content-Type', 'application/json');
      payload = (!_.isEmpty(data) && method !== methods.GET) ? {body: JSON.stringify(data)} : {};
    }
  }

  // Prepare query request options.
  const requestOptions = {
    ...(includeCredentials && {credentials: 'include'}),
    method,
    headers,
    ...payload,
  };

  const url = isExternalUrl ? endpoint : `${process.env.API_BASE}${endpoint}`;

  return fetch(`${url}${params}`, requestOptions)
    // If error occured within the fetch itself, catch it and resolve promise with error message string.
    .then(processResponse)
    .catch(error => ({errors: [error.message]}));
}

// Action creator for action sent when request is created.
function requestPendingAction(nextAction, metadata, requestParams) {
  return {
    type: API_REQUEST_PENDING,
    nextAction,
    metadata,
    requestParams,
  };
}

// Action creator for action sent when request is complete, incudes response payload.
function requestCompleteAction(nextAction, metadata, {data, errors}) {
  return {
    type: nextAction,
    data,
    errors,
    isError: _.get(errors, 'length') > 0,
    metadata,
  };
}

function processRequests(store, requests, requestIndex = 0) {
  if (requests.length <= requestIndex) {
    return;
  }

  // Take `requestIndex`-th requst.
  // requestParams is object with keys `endpoint` (string) and optional `method` (string) and `data` (object) keys.
  // nextAction is string representing type of next action.
  // metadata is optional object, which is passed along from API_REQUEST action to `nextAction`.
  const {requestParams, nextAction, metadata = {}} = requests[requestIndex];

  if (_.isBoolean(metadata.useSessionStorage)) {
    setStorageEngine(metadata.useSessionStorage);
  }

  // dispatch pending request action
  store.dispatch(requestPendingAction(nextAction, metadata, requestParams));

  // Create request with given requestParams.
  performRequest(requestParams)
    // When response is received, use it to build next action and dispatch it.
    .then(requestCompleteAction.bind(null, nextAction, metadata))
    .then(store.dispatch)
    .then(() => processRequests(store, requests, requestIndex + 1));
}

// Declare middleware to handle API_REQUEST actions.
const apiRequest = store => next => action => { // eslint-disable-line consistent-return
  // Skip actions which aren't API_REQUEST.
  if (action.type !== API_REQUEST) {
    return next(action);
  }

  processRequests(store, _.castArray(action.payload));
};

export default apiRequest;
