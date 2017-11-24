import types from 'actions/types';

const { GET_NOTIFICATIONS } = types;

const initialState = {
  pagination: {},
  notifications: []
};

/**
 * @returns {undefined}
 * @param {object} state
 * @param {object} action
 */
export default (state = initialState, action = {}) => {
  switch (action.type) {
  case GET_NOTIFICATIONS:
    return { ...action };

  default: return state;
  }
};
