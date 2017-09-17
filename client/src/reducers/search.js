import { BOOKS_SEARCHED } from '../actions/types';

export default (state = {}, action = {}) => {
  /* eslint-disable no-case-declarations */


  switch (action.type) {
    case BOOKS_SEARCHED:
      return action.result;

    default: return state;
  }
};
