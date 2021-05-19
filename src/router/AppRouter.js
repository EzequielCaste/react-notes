import React from 'react';
import {Route, Router, Switch} from 'wouter';

import {NotesApp} from '../NotesApp';
import Login from '../components/Login';
import ProtectedRoute from '../components/ProtectedRoute';

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <ProtectedRoute exact={true} path="/" component={NotesApp} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
