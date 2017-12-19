import types from '../actions/types';
import { initialHistoryState } from './initialState';

const { GET_BOOKS_HISTORIES } = types;

/**
 * Handles histories reducer
 *
 * @returns {object} new state
 *
 * @param {object} state
 * @param {object} action
 */
const histories = (state = initialHistoryState, action = {}) => {
  switch (action.type) {
  case GET_BOOKS_HISTORIES:
    return { ...action };

  default: return state;
  }
};

export default histories;
