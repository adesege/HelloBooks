import findIndex from 'lodash/findIndex';
import types from '../actions/types';

const {
  SET_BOOKS,
  BOOK_ADDED,
  BOOKS_SEARCHED,
  BOOK_FETCHED,
  BOOK_UPDATED,
  BOOK_DELETED } = types;
export default (state = [], action = {}) => {
  /* eslint-disable no-case-declarations */
  switch (action.type) {
    case SET_BOOKS:
      return action.books;

    case BOOK_ADDED:
      return [
        action.book,
        ...state
      ];

    case BOOKS_SEARCHED:
      return action.result;

    case BOOK_FETCHED:
      const index = findIndex(state, item => item.id === action.book.id);
      if (index > -1) {
        return state.map((item) => {
          if (item.id === action.book.id) return action.book;
          return item;
        });
      }
      return action.book;

    case BOOK_UPDATED:
      const idIndex = findIndex(state, item => item.id === action.book.id);
      if (idIndex > -1) {
        return state.map((item) => {
          if (item.id === action.book.id) return action.book;
          return item;
        });
      }
      return action.book;

    case BOOK_DELETED:
      const findBook = findIndex(
        state,
        item => parseInt(item.id, 10) === parseInt(action.bookId, 10));
      if (findBook >= 0) {
        return [
          ...state.slice(0, findBook),
          ...state.slice(findBook + 1),
        ];
      }
      return state;

    default: return state;
  }
};
