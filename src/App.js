import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route } from 'react-router-dom';

import './App.scss';
import { privateRoutes } from './utils/routes';
import PrivateRoute from './utils/privateRoute';

function App({ history }) {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        {privateRoutes.map(route => (
          route.submenu ? (
            route.submenu.map(sub_route => (
              <PrivateRoute
                key={sub_route.key}
                path={sub_route.path}
                component={sub_route.component}
                isLoggedIn={true}
              />
            ))
          ) : (
            <PrivateRoute
              key={route.key}
              path={route.path}
              component={route.component}
              isLoggedIn={true}
            />
          )
        ))}
      </Switch>
    </ConnectedRouter>
  )
}

export default App