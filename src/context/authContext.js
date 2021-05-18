import {createContext, useState} from 'react';

export const AuthContext = createContext(null);

export function AuthProvider(props) {
  const [state, setLoggedIn] = useState({
    isLoggedIn: false,
  });

  const actions = {
    handleLogin: (username, password) => {
      console.log('action login');
      fetch(`${process.env.REACT_APP_API_ROUTE}/auth/login`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({username, password}),
      })
        .then((resp) => resp.json())
        .then((data) => console.log(data));
    },
  };

  return (
    <AuthContext.Provider value={{state, actions}}>
      {props.children}
    </AuthContext.Provider>
  );
}
