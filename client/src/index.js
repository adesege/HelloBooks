import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import axios from 'axios';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import store from './store';
import Routes from './Routes';
import setAuthorizationToken from './utils/setAuthorizationToken';
import { setCurrentUser, logout } from './actions/auth';
import { addFlashMessage } from './actions/flashMessages';


axios.interceptors.request.use((response) => {
  store.dispatch(showLoading());
  return response;
}, () => {
  store.dispatch(showLoading());
});

// Add a response interceptor
axios.interceptors.response.use((response) => {
  store.dispatch(hideLoading());
  return response;
}, (error) => {
  store.dispatch(hideLoading());
  if (error.response.status === 401 || error.response.status === 403) {
    store.dispatch(addFlashMessage({
      type: 'error',
      text: error.response.data
    }));
    store.dispatch(logout());
  }
  return Promise.reject(error);
});

if (localStorage.authToken) {
  setAuthorizationToken(localStorage.authToken);
  store.dispatch(setCurrentUser(JSON.parse(localStorage.userPayload)));
}

render(<Provider store={store}>
  <Routes />
</Provider>, document.getElementById('app'));
