import React, {useContext} from 'react';
import {Redirect} from 'wouter';
import {AuthContext} from '../../context/authContext';

const ProtectedRoute = (props) => {
  const Component = props.component;
  const {state} = useContext(AuthContext);

  return state.isLoggedIn ? (
    <Component notes={state.notes} />
  ) : (
    <Redirect to="/login" />
  );
};

export default ProtectedRoute;
