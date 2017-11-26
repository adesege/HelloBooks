import types from '../actions/types';

const { GET_BOOKS_HISTORIES } = types;

const initialState = {
  histories: [],
  pagination: {}
};
/**
 * @returns {undefined}
 * @param {object} state
 * @param {object} action
 */
export default (state = initialState, action = {}) => {
  switch (action.type) {
  case GET_BOOKS_HISTORIES:
    return { ...action };

  default: return state;
  }
};
