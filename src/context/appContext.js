import {createContext, useState} from 'react';
import Swal from 'sweetalert2';
import {useLocation} from 'wouter';

export const AppContext = createContext(null);

export function AppProvider(props) {
  const [location, setLocation] = useLocation();
  const [state, setState] = useState({
    currentUser: 'test',
    currentPath: location,
    isLoading: false,
    isLoggedIn: true,
    notes: [],
    token: '',
    modal: false,
    action: 'new',
    currentNote: {
      title: '',
      content: '',
    },
  });

  const actions = {
    changeAction: (action) => {
      setState((prev) => ({
        ...prev,
        action,
      }));
    },
    changeNote: (note) => {
      setState((prev) => ({
        ...prev,
        currentNote: note,
      }));
    },
    toggleModal: () => {
      console.log('toggle');
      setState((prev) => ({
        ...prev,
        modal: !prev.modal,
      }));
    },
    createNote: ({title, content}) => {
      setState((prev) => ({
        ...prev,
        isLoading: true,
      }));
      fetch(`${process.env.REACT_APP_API_ROUTE}/notes/new`, {
        method: 'POST',
        headers: {
          'x-access-token': state.token,
          'content-type': 'application/json',
        },
        body: JSON.stringify({title, content}),
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (data.ok) {
            setState((prev) => ({
              ...prev,
              isLoading: false,
              notes: data.user.notes,
              modal: !prev.modal,
              currentNote: {title: '', content: ''},
            }));
            Swal.fire('success', 'Note created!', 'success');
            setLocation('/');
          } else {
            console.log('error', data);
            Swal.fire('error', `${data.msg}`, 'error');
          }
        });
    },
    editNote: (id, {title, content}) => {
      fetch(`${process.env.REACT_APP_API_ROUTE}/notes/${id}`, {
        method: 'PUT',
        headers: {
          'x-access-token': state.token,
          'content-type': 'application/json',
        },
        body: JSON.stringify({title, content}),
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (data.ok) {
            setState((prev) => ({
              ...prev,
              modal: !prev.modal,
              currentNote: {title: '', content: ''},
            }));
            actions.getNotes(state.token);
            setLocation('/');
          } else {
            Swal.fire('error', `${data.msg}`, 'error');
          }
        });
    },
    deleteNote: (id) => {
      fetch(`${process.env.REACT_APP_API_ROUTE}/notes/${id}`, {
        method: 'DELETE',
        headers: {
          'x-access-token': state.token,
          'content-type': 'application/json',
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (data.ok) {
            Swal.fire('success', 'Note deleted!', 'success');
          } else {
            Swal.fire('Error', `${data.msg.message}`, 'error');
          }
        });
      actions.getNotes(state.token);
    },
    handleRegister: async (username, password) => {
      setState((prev) => ({
        ...prev,
        isLoading: true,
      }));
      await fetch(`${process.env.REACT_APP_API_ROUTE}/auth/register`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({username, password}),
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (data.ok) {
            Swal.fire('Registration successful!', '', 'success');
            setState((prev) => ({
              ...prev,
              isLoading: false,
              isLoggedIn: true,
              token: data.token,
              currentUser: data.user.username,
              notes: data.user.notes,
            }));
            setLocation('/');
          } else {
            Swal.fire('Error', data.msg, 'error');
            setState((prev) => ({
              ...prev,
              isLoading: false,
            }));
          }
        });
    },
    handleLogin: async (username, password) => {
      setState((prev) => ({
        ...prev,
        isLoading: true,
      }));
      await fetch(`${process.env.REACT_APP_API_ROUTE}/auth/login`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({username, password}),
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (data.ok) {
            Swal.fire('Login Successful!', '', 'success');
            setState((prev) => ({
              ...prev,
              currentUser: data.user.username,
              isLoggedIn: true,
              token: data.token,
              isLoading: false,
            }));
            actions.getNotes(data.token);
            setLocation('/');
          } else {
            Swal.fire('error', `${data.msg}`, 'error');
            setState((prev) => ({
              ...prev,
              isLoading: false,
            }));
          }
        });
    },
    handleLogout: () => {
      fetch(`${process.env.REACT_APP_API_ROUTE}/auth/logout`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setState((prev) => ({
            ...prev,
            isLoading: false,
            isLoggedIn: false,
            currentUser: '',
            currentNote: {title: '', content: ''},
          }));
          Swal.fire('Logged out!', '', 'success');
        });
    },
    getNotes: (token) => {
      fetch(`${process.env.REACT_APP_API_ROUTE}/notes`, {
        method: 'GET',
        headers: {
          'x-access-token': token,
          'content-type': 'application/json',
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (data.ok) {
            setState((prev) => ({
              ...prev,
              notes: data.user.notes,
            }));
          } else {
            console.log(data.msg);
          }
        });
    },
  };

  return (
    <AppContext.Provider value={{state, actions}}>
      {props.children}
    </AppContext.Provider>
  );
}
