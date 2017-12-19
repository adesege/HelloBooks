import types from '../actions/types';

const {
  GET_USERS
} = types;

/**
 * Handles users reducer
 *
 * @param {object} state
 * @param {object} action
 *
 * @returns {array} new state
 */
const users = (state = [], action = {}) => {
  switch (action.type) {
  case GET_USERS:
    return action.result;

  default: return state;
  }
};

export default users;

