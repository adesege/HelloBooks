import findIndex from 'lodash/findIndex';
import { BOOK_FETCHED, BOOK_UPDATED } from '../actions/types';

export default (state = [], action = {}) => {
  /* eslint-disable no-case-declarations */
  switch (action.type) {
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


    default: return state;
  }
};
