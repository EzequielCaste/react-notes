import React, {useContext} from 'react';
import {AppContext} from '../../context/appContext';
import {useForm} from '../../hooks/useForm';

const Login = () => {
  const {state, actions} = useContext(AppContext);
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
    <div className="Login-container">
      <div className="Login-form">
        <h1>Login</h1>
        <form action="#" onSubmit={handleSubmit} className="">
          <div>
            <label>Username: </label>
            <input
              autoComplete="off"
              name="username"
              type="text"
              value={username}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Password: </label>
            <input
              autoComplete="off"
              name="password"
              type="password"
              value={password}
              onChange={handleInputChange}
            />
          </div>
          <button disabled={state.isLoading}>
            {state.isLoading ? 'Loading...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
