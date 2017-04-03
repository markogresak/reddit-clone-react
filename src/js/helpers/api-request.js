import _ from 'lodash';

export const API_REQUEST = 'API_REQUEST';
export const API_REQUEST_PENDING = 'API_REQUEST_PENDING';

export const methods = {
  GET: 'GET',
  PATCH: 'PATCH',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

/**
 * Send request to endpoint endpoint with given requestParams.
 *
 * @param   {string} endpoint   Url relative to API base path.
 * @param   {string} nextAction Action to be called after request is completed.
 * @param   {string} method     Request HTTP method.
 * @param   {Object} data       Optional data to be sent as request payload (or part of query url if method is GET).
 * @param   {Object} metadata   Optional metadata, which is dispatched with both pending and complete actions.
 *                                Does not affect the request. The idea is to help for example with optimistic updates.
 * @return  {Promise}           Action compatible with api-request middleware.
 */
function generateApiRequest({
  endpoint,
  nextAction,
  method,
  data = {},
  metadata = {},
  isExternalUrl = false,
}) {
  if (!endpoint) {
    throw new Error('Missing argument "endpoint" in apiRequest function');
  }

  if (!nextAction) {
    throw new Error('Missing argument "nextAction" in apiRequest function');
  }

  if (!method) {
    throw new Error('Missing argument "method" in apiRequest function');
  }

  return {
    requestParams: {
      endpoint,
      method,
      data,
      isExternalUrl,
    },
    nextAction,
    metadata,
  };
}

/**
 * @param  {Array|Object} requestParams Params for generateApiRequest. Can be a single object as expected by
 *                                        generateApiRequest function or an array of such objects.
 *                                        See above generateApiRequest function for expected object structure.
 * @return {[type]}       Action compatible with api-request middleware.
 */
function apiRequest(requestParams) {
  return {
    type: API_REQUEST,
    payload: _.castArray(requestParams).map(generateApiRequest),
  };
}

export default apiRequest;
