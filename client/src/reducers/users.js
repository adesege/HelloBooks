import types from '../actions/types';

const {
  GET_USERS
} = types;

/**
 * Handles users reducer
 *
 * @param {object} state - redux state
 * @param {object} action - action creator
 *
 * @returns {array} new state
 */
const users = (state = [], action = {}) => {
  switch (action.type) {
  case GET_USERS:
    return action.users;

  default: return state;
  }
};

export default users;

