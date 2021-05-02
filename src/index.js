import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import configureStore from './store/configureStore';
import AppRouter from './routers/AppRouter';
import { decode } from './helpers/api';
import { setUser, logIn } from './actions/user';
import { autoLogin } from './helpers/authUsers';
import './assets/styles/style.scss';

const store = configureStore();

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

const runAutoLogin = async (userId) => {
  const response = await autoLogin(userId);
  if (response.logged_in) {
    store.dispatch(setUser(response.user));
    store.dispatch(logIn(true));
  } else {
    store.dispatch(logIn(false));
    store.dispatch(setUser({}));
    localStorage.clear();
  }
};

if (localStorage.token) {
  const decodedToken = decode(localStorage.token);
  runAutoLogin(decodedToken.user_id);
} else {
  store.dispatch(logIn(false));
}

ReactDOM.render(jsx, document.getElementById('root'));
