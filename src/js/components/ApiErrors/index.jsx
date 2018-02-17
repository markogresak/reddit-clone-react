import React from 'react';
import PropTypes from 'prop-types';

import { dangerColor } from '../../style-vars';

const errorStyle = {
  marginBottom: 16,
  color: dangerColor,
};

const ApiErrors = ({ errors, errorMessageKey }) => {
  if (errors.length === 0) {
    return null;
  }

  return (
    <div style={errorStyle}>
      {errors.length === 1 ? (
        <span>Error: {errors[0][errorMessageKey]}</span>
      ) : (
        <div>
          <strong>Errors:</strong>
          <ul>{errors.map(({ [errorMessageKey]: message }) => <li key={message}>{message}</li>)}</ul>
        </div>
      )}
    </div>
  );
};

ApiErrors.propTypes = {
  errors: PropTypes.array,
  errorMessageKey: PropTypes.string,
};

ApiErrors.defaultProps = {
  errors: [],
  errorMessageKey: 'message',
};

export default ApiErrors;
