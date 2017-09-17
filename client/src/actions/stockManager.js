import axios from 'axios';
import { STOCK_MANAGER_FETCHED, STOCK_ADDED, STOCK_DELETED } from './types';
import { addFlashMessage } from './flashMessages';

const API_VERSION = window.API_VERSION;

export function stockDeleted(id) { // eslint-disable-line require-jsdoc
  return {
    type: STOCK_DELETED,
    id
  };
}

export function stockAdded(data) { // eslint-disable-line require-jsdoc
  return {
    type: STOCK_ADDED,
    data
  };
}

export function stockManagerFetched(data) { // eslint-disable-line require-jsdoc
  return {
    type: STOCK_MANAGER_FETCHED,
    data
  };
}


/**
 * 
 * 
 * @export
 * @param {object} data 
 * @returns {func} promise
 */
export const getStockManagerByBookId = data =>
  dispatch =>
    axios.get(`/api/${API_VERSION}/books/stocks?bookId=${data.bookId}`)
      .then(
        (response) => {
          dispatch(stockManagerFetched(response.data.data));
          return response;
        },
        errors => errors
      );


/**
 * 
 * 
 * @export
 * @param {object} data 
 * @returns {func} promise
 */
export const addStock = data =>
  dispatch =>
    axios.post(`/api/${API_VERSION}/books/stocks`, data)
      .then(
        (response) => {
          dispatch(stockAdded(response.data.data));
          dispatch(addFlashMessage({
            type: 'success',
            text: response.data.message
          }));
          return response;
        },
        (errors) => {
          dispatch(addFlashMessage({
            type: 'error',
            text: errors.response.data
          }));
          return errors;
        }
      );


/**
 * 
 * 
 * @export
 * @param {object} data 
 * @returns {func} promise
 */
export const deleteStock = data =>
  dispatch =>
    axios.delete(`/api/${API_VERSION}/books/stocks/${data.id}`)
      .then(
        (response) => {
          dispatch(stockDeleted(data.id));
          dispatch(addFlashMessage({
            type: 'success',
            text: response.data.message
          }));
          return response;
        },
        (errors) => {
          dispatch(addFlashMessage({
            type: 'error',
            text: errors.response.data
          }));
          return errors;
        }
      );
