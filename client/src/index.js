import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
<<<<<<< HEAD
import axios from 'axios';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import routes from './routes';
import rootReducer from './reducers';
import setAuthorizationToken from './assets/js/setAuthorizationToken';
import { setCurrentUser, logout } from './actions/auth';
=======
import routes from './routes';
import rootReducer from './reducers';
import setAuthorizationToken from './assets/js/setAuthorizationToken';
import { setCurrentUser } from './actions/auth';
>>>>>>> ad44c0c7b60423889f2e4e3e79b032885217e1d8

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

<<<<<<< HEAD
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
  // catches if the session ended!
  if (error.response.status === 401 || error.response.status === 403) {
    store.dispatch(logout());
  }
  return Promise.reject(error);
});

=======
>>>>>>> ad44c0c7b60423889f2e4e3e79b032885217e1d8
if (localStorage.authToken) {
  setAuthorizationToken(localStorage.authToken);
  store.dispatch(setCurrentUser(JSON.parse(localStorage.userPayload)));
}

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes}>
      {/* <Route path="signup" component={Signup}/> */}
    </Router>
  </Provider>, document.getElementById('app')
);
