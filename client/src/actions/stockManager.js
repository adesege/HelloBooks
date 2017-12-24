import axios from 'axios';
import types from './types';
import { addFlashMessage } from './flashMessages';

const { STOCK_FETCHED, STOCK_ADDED, STOCK_DELETED } = types;

/**
 * Action creator when stock has been deleted
 *
 * @param {number} id - deleted stock id
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
 * @param {array} stocks - newly added stock object
 *
 * @returns {object} action creator
 */
export const stockAdded = (stocks) => ({
  type: STOCK_ADDED,
  stocks
});

/**
 * Action creator when stock has been fetched
 *
 * @param {array} stocks - all stocks
 *
 * @returns {object} action creator
 */
export const stockFetched = (stocks) => ({
  type: STOCK_FETCHED,
  stocks
});


/**
 * Make network request to get stock
 * by book id
 *
 * @export
 *
 * @returns {promise} Axios http promise
 *
 * @param {object} options - options for getting stock by book id
 */
export const getStockByBookId = options =>
  dispatch =>
    axios.get(`books/stocks?bookId=${options.bookId}`)
      .then(
        (response) => {
          dispatch(stockFetched(response.data.stocks));
          return response;
        },
        errors => dispatch(addFlashMessage({
          type: 'error',
          text: errors.response.data.message
        }))
      );


/**
 * Make network request to add stock
 *
 * @export
 *
 * @param {object} options - options for adding a stock
 *
 * @returns {promise} Axios http promise
 */
export const addStock = options =>
  dispatch =>
    axios.post('books/stocks', options)
      .then(
        (response) => {
          dispatch(stockAdded(response.data.stock));
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
 * @param {object} options - options for deleting a stock
 *
 * @returns {promise} Axios http promise
 */
export const deleteStock = options =>
  dispatch =>
    axios
      .delete(`books/stocks/${options.id}`)
      .then(
        (response) => {
          dispatch(stockDeleted(options.id));
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
