import types from 'actions/types';
import { initialNotificationState } from './initialState';

const { GET_NOTIFICATIONS } = types;


/**
 * Handles notifications reducer
 *
 * @returns {object} new state
 *
 * @param {object} state
 * @param {object} action
*/
const notifications = (state = initialNotificationState, action = {}) => {
  switch (action.type) {
  case GET_NOTIFICATIONS:
    return { ...action };

  default: return state;
  }
};

export default notifications;
