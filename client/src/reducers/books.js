<<<<<<< HEAD
import { SET_BOOKS, ADD_BOOK } from '../actions/types';
=======
import { SET_BOOKS } from '../actions/types';
>>>>>>> ad44c0c7b60423889f2e4e3e79b032885217e1d8

export default (state = [], action = {}) => {
  switch (action.type) {
    case SET_BOOKS:
      return action.books;

<<<<<<< HEAD
    case ADD_BOOK:
      return [
        ...state,
        action.books
      ];

=======
>>>>>>> ad44c0c7b60423889f2e4e3e79b032885217e1d8
    default: return state;
  }
};
