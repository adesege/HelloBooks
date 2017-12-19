import axios from 'axios';
import types from './types';
import { addFlashMessage } from './flashMessages';

const {
  GET_NOTIFICATIONS
} = types;

/**
 * Action creator when notifications has been fetched
 *
 * @param {object} notifications
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
 * @param {object} data
 *
 * @returns {promise} Axios http response
 */
export const getNotifications = data =>
  dispatch => {
    // converts an object to query string
    const searchQuery = data ? new URLSearchParams(data) : null;
    // converts it to string
    const toQueryString = data ? searchQuery.toString() : '';
    return axios
      .get(`notifications?${toQueryString}`)
      .then(
        (response) => {
          dispatch(notificationsFetched({
            notifications: response.data.data,
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
