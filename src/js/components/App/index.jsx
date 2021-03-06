import React from 'react';
import PropTypes from 'prop-types';

import Menu from '../Menu';

const App = ({ children }) => {
  return (
    <div>
      <Menu />

      <div>{children}</div>
    </div>
  );
};

App.propTypes = {
  children: PropTypes.object,
};

App.defaultProps = {
  children: null,
};

export default App;
