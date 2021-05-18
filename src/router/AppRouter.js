import React, {useContext} from 'react';
import {Route, Router, Switch} from 'wouter';
import {AuthContext} from '../context/authContext';
import {NotesApp} from '../NotesApp';
import Login from '../components/Login';
import ProtectedRoute from '../components/ProtectedRoute';

const AppRouter = () => {
  const {state} = useContext(AuthContext);
  const {isLoggedIn} = state;

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
