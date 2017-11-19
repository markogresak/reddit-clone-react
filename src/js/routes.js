import React from 'react';
import PropTypes from 'prop-types';
import {Route, Switch} from 'react-router-dom';
import {ConnectedRouter} from 'react-router-redux';

import App from './components/App';
import Posts from './components/Posts';
import Post from './components/Post';
import NotFound from './components/NotFound';

const publicPath = '/';

export const routeCodes = {
  HOME: publicPath,
  POST: `${publicPath}posts/:id`,
  USER: `${publicPath}users/:id`,
};

const Routes = ({history}) => {
  return (
    <ConnectedRouter history={history}>
      <div>
        <App>
          <Switch>
            <Route exact path={routeCodes.HOME} component={Posts} />
            <Route path={routeCodes.POST} component={Post} />
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
