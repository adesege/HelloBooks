import types from '../actions/types';

const { BOOKS_SEARCHED } = types;

export default (state = {}, action = {}) => {
  /* eslint-disable no-case-declarations */


  switch (action.type) {
    case BOOKS_SEARCHED:
      return action.result;

    default: return state;
  }
};
