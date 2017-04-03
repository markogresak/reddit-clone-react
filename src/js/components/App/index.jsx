import React, {PropTypes} from 'react';

import Menu from '../Menu';

const App = ({children}) => {
  return (
    <div className="App">
      <Menu />

      <div className="Page">
        {children}
      </div>
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
