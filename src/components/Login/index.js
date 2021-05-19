import React, {useContext} from 'react';
import {AppContext} from '../../context/appContext';
import {useForm} from '../../hooks/useForm';

const Login = () => {
  const {actions} = useContext(AppContext);
  const [formValues, handleInputChange, reset] = useForm({
    username: '',
    password: '',
  });
  const {username, password} = formValues;
  const handleSubmit = (e) => {
    e.preventDefault();
    actions.handleLogin(username, password);
    reset();
  };
  return (
    <div>
      <h1>Login</h1>
      <form action="#" onSubmit={handleSubmit} className="Login-form">
        <div>
          <label>Username: </label>
          <input
            name="username"
            type="text"
            value={username}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Password: </label>
          <input
            name="password"
            type="password"
            value={password}
            onChange={handleInputChange}
          />
        </div>
        <button>Send</button>
      </form>
    </div>
  );
};

export default Login;
