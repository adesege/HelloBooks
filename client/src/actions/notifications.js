import axios from 'axios';
import types from './types';
import { addFlashMessage } from './flashMessages';

const {
  GET_NOTIFICATIONS
} = types;

/**
 * @returns {object} action
 * @param {object} notifications
 */
export const notificationsFetched = notifications => ({
  type: GET_NOTIFICATIONS,
  ...notifications
});

/**
 * @returns {object} response result
 * @param {object} data
 */
export const getNotifications = data =>
  dispatch => {
    const searchQuery = data ? new URLSearchParams(data) : null; // converts an object to query string
    const toQueryString = data ? searchQuery.toString() : ''; // converts it to string
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
