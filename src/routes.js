import React from 'react';
import {
  BrowserRouter, Route, Switch, Redirect,
} from 'react-router-dom';
import { isAuthenticated } from '~/services/auth';

import SignIn from '~/pages/SignIn';
import SignUp from './pages/SignUp';
import NotFound from './pages/NotFound';
import User from './pages/User';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    rest={{ ...rest }}
    render={(props) => (isAuthenticated() ? (
      <Component props={{ ...props }} />
    ) : (
      <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    ))}
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <PrivateRoute path="/user" component={User} />
      <Route path="*" component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
