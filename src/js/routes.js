import React, {PropTypes} from 'react';
import {Route, Switch} from 'react-router-dom';
import {ConnectedRouter} from 'react-router-redux';

import App from './components/App';
import Dashboard from './components/Dashboard';
import NotFound from './components/NotFound';

const publicPath = '/';

export const routeCodes = {
  DASHBOARD: publicPath,
};

const Routes = ({history}) => {
  return (
    <ConnectedRouter history={history}>
      <div>
        <App>
          <Switch>
            <Route exact path={routeCodes.DASHBOARD} component={Dashboard} />
            <Route component={NotFound} />
          </Switch>
        </App>
      </div>
    </ConnectedRouter>
  );
};

Routes.propTypes = {
  history: PropTypes.object,
};

Routes.defaultProps = {
  history: {},
};

export default Routes;
