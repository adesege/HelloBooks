import { SET_BOOKS, ADD_BOOK, BOOKS_SEARCHED } from '../actions/types';

export default (state = [], action = {}) => {
  /* eslint-disable no-case-declarations */
  switch (action.type) {
    case SET_BOOKS:
      return action.books;

    case ADD_BOOK:
      return [
        ...state,
        action.books
      ];

    case BOOKS_SEARCHED:
      return action.result;

    default: return state;
  }
};
