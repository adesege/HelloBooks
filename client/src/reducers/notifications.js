import types from 'actions/types';
import { initialNotificationState } from './initialState';

const { GET_NOTIFICATIONS } = types;


/**
 * Handles notifications reducer
 *
 * @returns {object} new state
 *
 * @param {object} state - redux state
 * @param {object} action - action creator
*/
const notifications = (state = initialNotificationState, action = {}) => {
  switch (action.type) {
  case GET_NOTIFICATIONS:
    return { ...action };

  default: return state;
  }
};

export default notifications;
