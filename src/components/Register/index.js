import React, {useContext} from 'react';
import {Link} from 'wouter';
import {AppContext} from '../../context/appContext';
import {useForm} from '../../hooks/useForm';

const Register = () => {
  const {state, actions} = useContext(AppContext);
  const [formValues, handleInputChange, reset] = useForm({
    username: '',
    password: '',
  });
  const {username, password} = formValues;
  const handleSubmit = (e) => {
    e.preventDefault();
    actions.handleRegister(username, password);
    reset();
  };
  return (
    <div className="Form-container">
      <div className="Form-inner">
        <h1>Register</h1>
        <form action="#" onSubmit={handleSubmit} className="">
          <div>
            <label>Username: </label>
            <input
              required
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
              required
              autoComplete="off"
              name="password"
              type="password"
              value={password}
              onChange={handleInputChange}
            />
          </div>
          <button disabled={state.isLoading}>
            {state.isLoading ? 'Loading...' : 'Register'}
          </button>
          <Link to="/login">Sign In</Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
