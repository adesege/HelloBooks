import axios from 'axios';
import types from './types';
import { addFlashMessage } from './flashMessages';

const { STOCK_MANAGER_FETCHED, STOCK_ADDED, STOCK_DELETED } = types;

/**
 * Action creator when stock has been deleted
 *
 * @param {number} id
 *
 * @returns {object} action creator
 */
export const stockDeleted = (id) => ({
  type: STOCK_DELETED,
  id
});

/**
 * Action creator when stock has been added
 *
 * @param {number} data
 *
 * @returns {object} action creator
 */
export const stockAdded = (data) => ({
  type: STOCK_ADDED,
  data
});

/**
 * Action creator when stock has been fetched
 *
 * @param {object} data
 *
 * @returns {object} action creator
 */
export const stockManagerFetched = (data) => ({
  type: STOCK_MANAGER_FETCHED,
  data
});


/**
 * Make network request to get stock
 * by book id
 *
 * @export
 *
 * @returns {promise} Axios http promise
 *
 * @param {object} data
 */
export const getStockManagerByBookId = data =>
  dispatch =>
    axios.get(`books/stocks?bookId=${data.bookId}`)
      .then(
        (response) => {
          dispatch(stockManagerFetched(response.data.data));
          return response;
        },
        errors => errors
      );


/**
 * Make network request to add stock
 *
 * @export
 *
 * @param {object} data
 *
 * @returns {promise} Axios http promise
 */
export const addStock = data =>
  dispatch =>
    axios.post(`books/stocks`, data)
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
            text: errors.response.data.message
          }));
          return errors;
        }
      );


/**
 * Make network request to delete a stock
 *
 * @export
 *
 * @param {object} data
 *
 * @returns {promise} Axios http promise
 */
export const deleteStock = data =>
  dispatch =>
    axios
      .delete(`books/stocks/${data.id}`)
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
            text: errors.response.data.message
          }));
          return errors;
        }
      );
