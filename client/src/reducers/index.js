import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading-bar';
import flashMessages from './flashMessages';
import auth from './auth';
import books from './books';
import book from './book';
import cropper from './cropper';

export default combineReducers({
  flashMessages,
  auth,
  books,
  loadingBar: loadingBarReducer,
  cropper,
  book
});
