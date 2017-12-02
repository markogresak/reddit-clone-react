import React from 'react';
import PropTypes from 'prop-types';
import {Route, Switch} from 'react-router-dom';
import {ConnectedRouter} from 'react-router-redux';

import App from './components/App';
import Posts from './components/Posts';
import Post from './components/Post';
import User from './components/User';
import Login from './components/Login';
import Logout from './components/Logout';
import NotFound from './components/NotFound';

const publicPath = '/';

export const routeCodes = {
  HOME: publicPath,
  POST: `${publicPath}posts/:id`,
  USER: `${publicPath}users/:id/:tab?`,
  LOGIN: `${publicPath}login`,
  LOGOUT: `${publicPath}logout`,
};

const Routes = ({history}) => {
  return (
    <ConnectedRouter history={history}>
      <div>
        <App>
          <Switch>
            <Route exact path={routeCodes.HOME} component={Posts} />
            <Route path={routeCodes.POST} component={Post} />
            <Route path={routeCodes.USER} component={User} />
            <Route path={routeCodes.LOGIN} component={Login} />
            <Route path={routeCodes.LOGOUT} component={Logout} />
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
