import React, {PropTypes} from 'react';
import {Provider} from 'react-redux';

import Routes from '../../routes';

const RootContainer = ({store, history}) => {
  return (
    <Provider store={store}>
      <Routes history={history} />
    </Provider>
  );
};

RootContainer.propTypes = {
  store: PropTypes.object,
  history: PropTypes.object,
};

RootContainer.defaultProps = {
  store: {},
  history: {},
};

export default RootContainer;
