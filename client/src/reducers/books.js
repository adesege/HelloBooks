import findIndex from 'lodash/findIndex';
import types from '../actions/types';
import { initialBookState } from './initialState';

const {
  SET_BOOKS,
  BOOK_ADDED,
  BOOKS_SEARCHED,
  BOOK_UPDATED,
  BOOK_DELETED
} = types;

export default (state = initialBookState, action = {}) => {
  /* eslint-disable no-case-declarations */
  switch (action.type) {
  case SET_BOOKS:
    return {
      ...action
    };
    break;
  case BOOK_ADDED:
    return {
      ...state,
      books: [
        action.book,
        ...state.books
      ]
    };
    break;
  case BOOKS_SEARCHED:
    return {
      ...state,
      books: [
        ...action.result
      ]
    };
    break;
  case BOOK_UPDATED:
    const findBookIndex = findIndex(
      state.books,
      item => parseInt(item.id, 10) === parseInt(action.book.id, 10)
    );
    if (findBookIndex > -1) {
      // state.books[findBookIndex] = action.book;
      return {
        ...state,
        books: [
          action.book,
          ...state.books.slice(0, findBookIndex),
          ...state.books.slice(findBookIndex + 1),
        ]
      };
    }
    return state;
    break;
  case BOOK_DELETED:
    const findBook = findIndex(
      state.books,
      item => parseInt(item.id, 10) === parseInt(action.bookId, 10)
    );
    if (findBook > -1) {
      return {
        ...state,
        books: [
          ...state.books.slice(0, findBook),
          ...state.books.slice(findBook + 1),
        ]
      };
    }
    return state;
    break;
  default:
    return state;
  }
};
