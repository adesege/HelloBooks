import axios from 'axios';
import types from './types';
import { addFlashMessage } from './flashMessages';

const { API_VERSION } = window;

const {
  GET_BOOKS_HISTORIES
} = types;


export const historiesFetched = histories => ({
  type: GET_BOOKS_HISTORIES,
  ...histories
});


export const getHistories = data =>
  dispatch => {
    const searchQuery = data ? new URLSearchParams(data) : null; // converts an object to query string
    const toQueryString = data ? searchQuery.toString() : ''; // converts it to string
    return axios
      .get(`/api/${API_VERSION}/books/histories/${data.userId}?${toQueryString}`)
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
            text: errors.response.data
          }));
          return errors;
        }
      );
  };

