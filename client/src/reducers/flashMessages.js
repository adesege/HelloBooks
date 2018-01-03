import types from '../actions/types';

const { ADD_FLASH_MESSAGE, DELETE_FLASH_MESSAGE } = types;

/**
 * Handles flash messages reducer
 *
 * @returns {object} new state
 *
 * @param {object} state - redux state
 * @param {object} action - action creator
 */
const flashMessages = (state = {}, action = {}) => {
  switch (action.type) {
  case ADD_FLASH_MESSAGE:
    return {
      type: action.message.type,
      text: action.message.text
    };
  case DELETE_FLASH_MESSAGE:
    return {};
  default: return state;
  }
};

export default flashMessages;
