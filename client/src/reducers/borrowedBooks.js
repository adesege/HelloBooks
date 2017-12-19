import findIndex from 'lodash/findIndex';
import types from '../actions/types';

const { BOOK_BORROWED, GET_BORROWED_BOOKS, BOOK_RETURNED } = types;

/**
 * Handles Borrowed books reducer
 *
 * @param {object} state
 * @param {object} action
 *
 * @returns {array} new state
 */
const borrowedBooks = (state = [], action = {}) => {
  /* eslint-disable no-case-declarations */
  switch (action.type) {
  case BOOK_BORROWED:
    return [
      action.book,
      ...state
    ];

  case GET_BORROWED_BOOKS:
    return action.book;

  case BOOK_RETURNED:
    const index = findIndex(
      state,
      item => parseInt(item.id, 10) === parseInt(action.book.borrowedBookId, 10)
    );
    if (index >= 0) {
      return [
        ...state.slice(0, index),
        ...state.slice(index + 1),
      ];
    }
    return state;

  default: return state;
  }
};

export default borrowedBooks;
