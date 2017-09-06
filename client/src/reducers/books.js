import { SET_BOOKS } from '../actions/types';

export default (state = [], action = {}) => {
  switch (action.type) {
    case SET_BOOKS:
      return action.books;

    default: return state;
  }
};
