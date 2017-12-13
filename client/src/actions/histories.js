import axios from 'axios';
import types from './types';
import { addFlashMessage } from './flashMessages';

const {
  GET_BOOKS_HISTORIES
} = types;

/**
 * Action creator when histories has been fetched
 *
 * @param {object} histories
 *
 * @returns {object} action creator
 */
export const historiesFetched = histories => ({
  type: GET_BOOKS_HISTORIES,
  ...histories
});

/**
 * Make network request to get histories
 *
 * @param {object} data
 *
 * @returns {promise} Axios http promise
 */
export const getHistories = data =>
  dispatch => {
    // converts an object to query string
    const searchQuery = data ? new URLSearchParams(data) : null;
    // converts it to string
    const toQueryString = data ? searchQuery.toString() : '';
    return axios
      .get(`books/histories/${data.userId}?${toQueryString}`)
      .then(
        (response) => {
          dispatch(historiesFetched({
            histories: response.data.data,
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

