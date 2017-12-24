import axios from 'axios';
import types from './types';
import { addFlashMessage } from './flashMessages';

const {
  GET_NOTIFICATIONS
} = types;

/**
 * Action creator when notifications has been fetched
 *
 * @param {array} notifications - all notifications object
 *
 * @returns {object} action
 */
export const notificationsFetched = notifications => ({
  type: GET_NOTIFICATIONS,
  ...notifications
});

/**
 * Make network request to get all notifications
 * or by a particular notification
 *
 * @param {object} options - options for getting notifications
 *
 * @returns {promise} Axios http response
 */
export const getNotifications = options =>
  dispatch => {
    // converts an object to query string
    const searchQuery = options ? new URLSearchParams(options) : null;
    // converts it to string
    const toQueryString = options ? searchQuery.toString() : '';
    return axios
      .get(`notifications?${toQueryString}`)
      .then(
        (response) => {
          dispatch(notificationsFetched({
            notifications: response.data.notifications,
            pagination: response.data.pagination
          }));
        },
        (errors) => {
          dispatch(addFlashMessage({
            type: 'error',
            text: errors.response.data.message
          }));
          return errors;
        }
      );
  };
