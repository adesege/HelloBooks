import isEmpty from 'lodash/isEmpty';
import types from '../actions/types';
import { initialAuthState } from '../reducers/initialState';

const { SET_CURRENT_USER } = types;

/**
 * Handles user authentication
 *
 * @param {object} state
 * @param {object} action
 *
 * @returns {object} new state
*/
const auth = (state = initialAuthState, action = {}) => {
  switch (action.type) {
  case SET_CURRENT_USER:
    return {
      isAuthenticated: !isEmpty(action.user),
      user: action.user
    };
  default: return state;
  }
};

export default auth;
