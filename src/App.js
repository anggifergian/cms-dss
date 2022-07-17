import React from 'react';
import { useSelector } from 'react-redux';
import { Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import Boot from './redux/boot'

import './App.scss';
import { privateRoutes, publicRoutes } from './utils/routes';
import PrivateRoute from './utils/privateRoute';
import PublicRoute from './utils/publicRoute';

function App({ history }) {
  const { token } = useSelector(state => state.Auth)

  return (
    <ConnectedRouter history={history}>
      <Switch>
        {publicRoutes.map(route => (
          <PublicRoute
            key={route.key}
            exact={route.exact}
            path={route.path}
            component={route.component}
            isLoggedIn={token}
          />
        ))}
        {privateRoutes.map(route => (
          route.submenu ? (
            route.submenu.map(sub_route => (
              <PrivateRoute
                key={sub_route.key}
                path={sub_route.path}
                component={sub_route.component}
                isLoggedIn={token}
              />
            ))
          ) : (
            <PrivateRoute
              key={route.key}
              path={route.path}
              component={route.component}
              isLoggedIn={token}
            />
          )
        ))}
      </Switch>
    </ConnectedRouter>
  )
}

Boot()
  .then(() => App())
  .catch(error => console.log(error))

export default App