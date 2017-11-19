/**
 * Check if the current environment is configured as production.
 * This method is defined in a way to work with both ECMAScript Modules (code processed by Babel, i.e. app code)
 * and code which runs directly on node and doesn't support `import ... from ...` syntax yet, e.g. webpack.
 *
 * @return {Boolean}  False if `process.env.NODE_ENV` is explicitly set to `development`, otherwise, returns true.
 */
module.exports = function isProduction() {
  try {
    return process.env.NODE_ENV !== 'development';
  } catch (_e) {
    // If access to `process.env.NODE_ENV` fails, default to `true`, i.e. production.
    return true;
  }
};
