import isProduction from './is-production';

const placeholderRe = /:([A-Za-z0-9_]+)\??/;
const allPlaceholdersRe = new RegExp(placeholderRe, 'g');

function getType(val) {
  return Array.isArray(val) ? 'array' : typeof val;
}

/**
 * Replacer to be used with JSON.stringify.
 * Replaces undefined with null so the missing key is not removed from the stringified object.
 */
function replacer(_key, val) {
  return val === undefined ? 'undefined' : val;
}

/**
 * A helper function for displaying errors.
 * It throws the error with `msg` as message in development,
 * but only logs the error via console.error in production.
 *
 * @param  {String} msg Error messqge.
 */
function err(msg) {
  if (isProduction()) {
    console.error(msg); // eslint-disable-line no-console
  } else {
    throw new Error(msg);
  }
}

function urlFromTemplate(templateUrl, params = {}) {
  if (getType(templateUrl) !== 'string') {
    return err(`urlFromTemplate: Expecting templateUrl to be a string, got ${getType(templateUrl)}`);
  }

  const placeholders = (templateUrl.match(allPlaceholdersRe) || [])
    .map(placeholder => ({
      key: placeholder.match(placeholderRe)[1],
      regex: new RegExp(`(${placeholder.replace('?', '\\?')})`),
      optional: placeholder[placeholder.length - 1] === '?',
    }));

  const missingParams = placeholders
    .filter(({key, optional}) => !optional && params[key] === undefined)
    .map(({key}) => `"${key}"`);

  if (missingParams.length !== 0) {
    return err(`urlFromTemplate: Missing ${missingParams.join(', ')} params, got params = ${JSON.stringify(params, replacer)}`);
  }

  const arePlaceholdersValid = placeholders.every(({key, optional}) => {
    const type = getType(params[key]);
    if (!optional && type !== 'number' && type !== 'string') {
      return err(`urlFromTemplate: Expecting params "${key}" value to be a number or a string, got ${type}`);
    }
    return true;
  });

  if (!arePlaceholdersValid) {
    return templateUrl;
  }

  return placeholders
    .reduce((url, {key, regex}) => url.replace(regex, params[key] || ''), templateUrl)
    .replace(/\/*$/, '') // remove trailing slash(es)
    .replace(/\/+/g, '/'); // replace multiple slashes with a single slash
}

export default urlFromTemplate;
