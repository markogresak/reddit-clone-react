import React from 'react';
import { Redirect } from 'react-router-dom';

import { clearUserToken } from '../../helpers/token-manager';
import { routeCodes } from '../../routes';

const Logout = () => {
  clearUserToken();

  return <Redirect to={routeCodes.HOME} />;
};

export default Logout;
