import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading-bar';
import flashMessages from './flashMessages';
import auth from './auth';
import books from './books';
import cropper from './cropper';
import borrowedBooks from './borrowedBooks';
import categories from './categories';
import stockManager from './stockManager';
import histories from './histories';
import users from './users';

export default combineReducers({
  flashMessages,
  auth,
  books,
  loadingBar: loadingBarReducer,
  cropper,
  borrowedBooks,
  categories,
  stocks: stockManager,
  histories,
  users
});
