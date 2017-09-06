import { combineReducers } from 'redux';
import flashMessages from './flashMessages';
import auth from './auth';
import books from './books';

export default combineReducers({
  flashMessages,
  auth,
  books
});
