import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import App from './components/App';
import Posts from './components/Posts';
import Post from './components/Post';
import NewPost from './components/NewPost';
import User from './components/User';
import Login from './components/Login';
import Logout from './components/Logout';
import Register from './components/Register';
import NotFound from './components/NotFound';

const publicPath = '/';

export const routeCodes = {
  HOME: publicPath,
  POST: `${publicPath}posts/:id`,
  NEW_POST: `${publicPath}posts/new/:type`,
  USER: `${publicPath}users/:id/:tab?`,
  LOGIN: `${publicPath}login`,
  LOGOUT: `${publicPath}logout`,
  REGISTER: `${publicPath}register`,
};

const Routes = ({ history }) => {
  return (
    <ConnectedRouter history={history}>
      <div>
        <App>
          <Switch>
            <Route exact path={routeCodes.HOME} component={Posts} />
            <Route path={routeCodes.NEW_POST} component={NewPost} />
            <Route path={routeCodes.POST} component={Post} />
            <Route path={routeCodes.USER} component={User} />
            <Route path={routeCodes.LOGIN} component={Login} />
            <Route path={routeCodes.LOGOUT} component={Logout} />
            <Route path={routeCodes.REGISTER} component={Register} />
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
