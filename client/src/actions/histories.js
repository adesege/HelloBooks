import axios from 'axios';
import types from './types';
import { addFlashMessage } from './flashMessages';

const { API_VERSION } = window.API_VERSION;
const {
  GET_BOOKS_HISTORIES
} = types;


export const historiesFetched = histories => ({
  type: GET_BOOKS_HISTORIES,
  histories
});


export const getHistories = data =>
  dispatch =>
    axios
      .get(`/api/${API_VERSION}/books/histories/${data.userId}`)
      .then(
        (response) => {
          dispatch(historiesFetched(response.data.data));
        },
        (errors) => {
          dispatch(addFlashMessage({
            type: 'error',
            text: errors.response.data
          }));
          return errors;
        }
      );
