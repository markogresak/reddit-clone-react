const apiRequestErrorLogger = () => next => action => {
  // If error occured, log it to console.
  if (action.isError) {
    /* eslint no-console: 0 */
    console.error(`API error(s):\n\t- ${action.errors.join('\n\t- ')}`);
  }

  // Resume the middleware chain.
  return next(action);
};

export default apiRequestErrorLogger;
