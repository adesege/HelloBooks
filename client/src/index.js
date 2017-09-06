import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import routes from './routes';
import rootReducer from './reducers';
import setAuthorizationToken from './assets/js/setAuthorizationToken';
import { setCurrentUser } from './actions/auth';

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

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
