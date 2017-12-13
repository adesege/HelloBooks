import types from '../actions/types';

const { BOOKS_SEARCHED } = types;

/**
 * Handles search reducer
 *
 * @param {object} state
 * @param {object} action
 *
 * @returns {object} new state
 */
const search = (state = {}, action = {}) => {
  switch (action.type) {
  case BOOKS_SEARCHED:
    return action.result;

  default: return state;
  }
};

export default search;
