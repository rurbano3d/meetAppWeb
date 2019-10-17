import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from '~/pages/Dashboard';
import Details from '~/pages/Details';
import New from '~/pages/New';
import SignIn from '~/pages/SignIn';
import Profile from '~/pages/Profile';
import SignUp from '~/pages/SignUp';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" component={SignUp} />
      <Route path="/profile" component={Profile} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/new" component={New} />
      <Route path="/details" component={Details} />
    </Switch>
  );
}
