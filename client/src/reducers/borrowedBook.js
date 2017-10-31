import { BOOK_BORROWED, BORROWED_BOOK, BOOK_RETURNED } from '../actions/types';

export default (state = {}, action = {}) => {
  switch (action.type) {
  case BOOK_BORROWED:
    return action.book;

  case BORROWED_BOOK:
    return action.book || {};

  case BOOK_RETURNED:
    return action.book;

  default: return state;
  }
};
