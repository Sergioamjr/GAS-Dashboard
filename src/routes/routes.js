import React from 'react';
import { Route, Switch, Redirect, HashRouter } from 'react-router-dom';
import Login from '../pages/Login';
import RestrictPage from '../components/RestrictPage';
import Home from '../pages/Home';
import Profile from '../pages/Profile/Profile';
import ListUses from '../pages/ListUsers/ListUsers';
import ListActions from '../pages/ListActions/ListActions';
import ListRotas from '../pages/ListRotas/ListRotas';

class AppRouter extends React.Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path='/' component={Login} />

          <Route
            exact
            path='/inicio'
            component={props => <RestrictPage component={Home} {...props} />}
          />
          <Route
            exact
            path='/meu-perfil'
            component={props => <RestrictPage component={Profile} {...props} />}
          />

          <Route
            exact
            path='/usuarios'
            component={props => (
              <RestrictPage component={ListUses} {...props} />
            )}
          />

          <Route
            exact
            path='/usuario/:id'
            component={props => <RestrictPage component={Profile} {...props} />}
          />

          <Route
            exact
            path='/lista-de-entregas'
            component={props => (
              <RestrictPage component={ListActions} {...props} />
            )}
          />

          <Route
            exact
            path='/lista-de-rotas'
            component={props => (
              <RestrictPage component={ListRotas} {...props} />
            )}
          />

          <Redirect to='/inicio' />
        </Switch>
      </HashRouter>
    );
  }
}

export default AppRouter;
