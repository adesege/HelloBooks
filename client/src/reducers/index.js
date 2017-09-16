import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading-bar';
import flashMessages from './flashMessages';
import auth from './auth';
import books from './books';
import book from './book';
import cropper from './cropper';
import borrowedBook from './borrowedBook';
import categories from './categories';

export default combineReducers({
  flashMessages,
  auth,
  books,
  loadingBar: loadingBarReducer,
  cropper,
  book,
  borrowedBook,
  categories
});
