import {createContext, useState} from 'react';
import Swal from 'sweetalert2';
import {useLocation} from 'wouter';

export const AppContext = createContext(null);

export function AppProvider(props) {
  const [state, setState] = useState({
    currentUser: '',
    isLoggedIn: false,
    notes: [],
    token: '',
    modal: false,
    action: 'new',
    currentNote: {
      title: '',
      content: '',
    },
  });

  const [location, setLocation] = useLocation();

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
              notes: data.user.notes,
              modal: !prev.modal,
              currentNote: {title: '', content: ''},
            }));
            //Swal.fire('success', 'Nota creada!', 'success');
            setLocation('/');
          } else {
            Swal.fire('error', `${data.msg}`, 'error');
          }
        });
    },
    editNote: (id, {title, content}) => {
      console.log('action edit :', id, title, content);
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
            console.log('edit ok');
            //Swal.fire('success', 'Nota editada!', 'success');
            setLocation('/');
          } else {
            Swal.fire('error', `${data.msg}`, 'error');
          }
        });
      actions.getNotes(state.token);
    },
    deleteNote: (id) => {
      console.log('action delete', id);
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
            Swal.fire('success', 'Nota eliminada!', 'success');
            //setLocation('/');
          } else {
            Swal.fire('error', `${data.msg}`, 'error');
          }
        });
      actions.getNotes(state.token);
    },
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
              currentUser: data.user.username,
              isLoggedIn: true,
              token: data.token,
            }));
            actions.getNotes(data.token);
            setLocation('/');
          } else {
            Swal.fire('error', `${data.msg}`, 'error');
          }
        });
    },
    getNotes: (token) => {
      console.log(`get the notes`);
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
