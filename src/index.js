import React from 'react';
import ReactDOM from 'react-dom';
import {AppProvider} from './context/appContext';
import './index.css';
import AppRouter from './router/AppRouter';

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <AppRouter />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
