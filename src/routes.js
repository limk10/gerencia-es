import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { isAuthenticated } from "~/services/auth";

import SignIn from "~/pages/Auth/SignIn";
import SignUp from "~/pages/Auth/SignUp";
import { FormUser, ListUser } from "~/pages/User";
import Dashboard from "~/pages/Dashboard";
import NotFound from "~/pages/NotFound";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    rest={{ ...rest }}
    render={props =>
      isAuthenticated() ? (
        <Component props={{ ...props }} />
      ) : (
        <Redirect
          to={{ pathname: "/signin", state: { from: props.location } }}
        />
      )
    }
  />
);

const Routes = () => {
  return (
    <Switch>
      <PrivateRoute exact path="/" component={Dashboard} />
      <PrivateRoute exact path="/user" component={ListUser} />
      <PrivateRoute path="/user/create" component={FormUser} />
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="*" component={NotFound} />
    </Switch>
  );
};

export default Routes;
