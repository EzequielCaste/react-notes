import React, {useContext} from 'react';
import {Redirect} from 'wouter';
import {AppContext} from '../../context/appContext';

const ProtectedRoute = (props) => {
  const Component = props.component;
  const {state} = useContext(AppContext);

  if (state.isLoggedIn) {
    // actions.getNotes();
    // const {notes} = noteState;
    return <Component />;
  } else {
    return <Redirect to="/login" />;
  }

  // return authState.isLoggedIn ? (
  //   <Component notes={notes} />
  // ) : (
  //   <Redirect to="/login" />
  // );
};

export default ProtectedRoute;
