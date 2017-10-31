import types from '../actions/types';

const { BOOKS_SEARCHED } = types;

export default (state = {}, action = {}) => {
  switch (action.type) {
  case BOOKS_SEARCHED:
    return action.result;

  default: return state;
  }
};
