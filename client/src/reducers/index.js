import { combineReducers } from 'redux';
<<<<<<< HEAD
import { loadingBarReducer } from 'react-redux-loading-bar';
import flashMessages from './flashMessages';
import auth from './auth';
import books from './books';
import cropper from './cropper';
=======
import flashMessages from './flashMessages';
import auth from './auth';
import books from './books';
>>>>>>> ad44c0c7b60423889f2e4e3e79b032885217e1d8

export default combineReducers({
  flashMessages,
  auth,
<<<<<<< HEAD
  books,
  loadingBar: loadingBarReducer,
  cropper
=======
  books
>>>>>>> ad44c0c7b60423889f2e4e3e79b032885217e1d8
});
