import React from "react";
import { Route, Switch, Redirect, HashRouter } from "react-router-dom";
import Login from "../pages/Login";
import RestrictPage from "../components/RestrictPage";
import Home from "../pages/Home";
import Profile from "../pages/Profile/Profile";

class AppRouter extends React.Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/" component={Login} />

          <Route
            exact
            path="/inicio"
            component={props => <RestrictPage component={Home} {...props} />}
          />
          <Route
            exact
            path="/meu-perfil"
            component={props => <RestrictPage component={Profile} {...props} />}
          />

          <Redirect to="/" />
        </Switch>
      </HashRouter>
    );
  }
}

export default AppRouter;
