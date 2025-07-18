import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter } from 'react-router-dom';

const token = localStorage.getItem('token');
const user = localStorage.getItem('user');

if (token && user) {
  try {
    const parsedUser = JSON.parse(user);
    store.dispatch({ type: 'auth/login', payload: parsedUser });
  } catch (error) {
    console.error('Failed to parse user from localStorage:', error);
  }
}

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
