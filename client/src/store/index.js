import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';

const { NODE_ENV } = process.env;

export default createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    NODE_ENV === 'development' &&
     window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);
