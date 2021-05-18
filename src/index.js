import React from 'react';
import ReactDOM from 'react-dom';
import {AuthProvider} from './context/authContext';
import './index.css';
import AppRouter from './router/AppRouter';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
