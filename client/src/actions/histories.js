import axios from 'axios';
import types from './types';
import { addFlashMessage } from './flashMessages';

const {
  GET_BOOKS_HISTORIES
} = types;

/**
 * Action creator when histories has been fetched
 *
 * @param {object} histories - borrowed book history
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
 * @param {object} options - options for getting borrowed book history
 *
 * @returns {promise} Axios http promise
 */
export const getHistories = options =>
  dispatch => {
    // converts an object to query string
    const searchQuery = options ? new URLSearchParams(options) : null;
    // converts it to string
    const toQueryString = options ? searchQuery.toString() : '';
    return axios
      .get(`books/histories/${options.userId}?${toQueryString}`)
      .then(
        (response) => {
          dispatch(historiesFetched({
            histories: response.data.books,
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

