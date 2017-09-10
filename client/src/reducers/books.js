import { SET_BOOKS, ADD_BOOK } from '../actions/types';

export default (state = [], action = {}) => {
  switch (action.type) {
    case SET_BOOKS:
      return action.books;

    case ADD_BOOK:
      return [
        ...state,
        action.books
      ];

    default: return state;
  }
};
