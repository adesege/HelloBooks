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

  case BOOK_ADDED:
    return {
      books: [
        action.book,
        ...state.books
      ],
      pagination: {
        ...state.pagination
      }
    };

  case BOOKS_SEARCHED:
    return action.result;

  case BOOK_UPDATED:
    const book = state.books.map((item) => {
      if (parseInt(item.id, 10) === parseInt(action.book.id, 10)) {
        return action.book;
      }
      return {};
    });
    if (Object.keys(book[0]).length !== 0) {
      return {
        books: book,
        pagination: { ...state.pagination }
      };
    }
    return state;

  case BOOK_DELETED:
    const findBook = findIndex(
      state.books,
      item => parseInt(item.id, 10) === parseInt(action.bookId, 10)
    );
    if (findBook > -1) {
      return {
        books: [
          ...state.books.slice(0, findBook),
          ...state.books.slice(findBook + 1),
        ],
        pagination: { ...state.pagination }
      };
    }
    return state;

  default: return state;
  }
};
