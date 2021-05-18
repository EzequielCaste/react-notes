import {createContext, useState} from 'react';
import Swal from 'sweetalert2';
import {useLocation} from 'wouter';

export const AuthContext = createContext(null);

export function AuthProvider(props) {
  const [state, setState] = useState({
    isLoggedIn: false,
    notes: [],
    token: '',
  });
  const [location, setLocation] = useLocation();

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
        .then((data) => {
          if (data.ok) {
            Swal.fire('success', 'Login exitoso!', 'success');
            setState((prev) => ({
              ...prev,
              isLoggedIn: true,
              token: data.token,
              notes: data.user.notes,
            }));
            setLocation('/');
          } else {
            Swal.fire('error', `${data.msg}`, 'error');
          }
        });
    },
  };

  return (
    <AuthContext.Provider value={{state, actions}}>
      {props.children}
    </AuthContext.Provider>
  );
}
