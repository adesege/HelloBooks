import axios from 'axios';
import moment from 'moment';
import { ioGetNotifications } from 'assets/js/socket';
import types from './types';
import { addFlashMessage } from './flashMessages';

const { BOOK_BORROWED, GET_BORROWED_BOOKS, BOOK_RETURNED } = types;

/**
 * Action creator for
 * setting borrowed books
 * in application store
 * @returns {object} action
 * @param {object} book
 */
export const setBorrowedBooks = book => ({
  type: GET_BORROWED_BOOKS,
  book
});

/**
 * Action creator when book has been borrowed
 * @returns {object} action
 * @param {object} book
 */
export const bookBorrowed = book => ({
  type: BOOK_BORROWED,
  isReturned: false,
  book
});

/**
 * Action creator when book has been borrowed
 * @returns {object} action
 * @param {object} book
 */
export const setReturnedBook = book => ({
  type: BOOK_RETURNED,
  isReturned: true,
  book
});

/**
 * Make request to borrow a book
 * @returns {object} resource response
 * @param {object} data
 */
export const borrowBook = data =>
  dispatch => {
    const updatedAt = moment();
    return axios
      .post(`users/${data.userId}/books`, data)
      .then(
        (response) => {
          /*
          * Wait 1 seconds before emitting event to the client
          */
          setTimeout(() => {
            ioGetNotifications({
              updatedAt,
              notificationType: 'BOOK_BORROWED'
            });
          }, 1000);
          data.borrowedBookId = response.data.id; // set the borrowedBook Id
          dispatch(bookBorrowed(data));
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
  };

/**
* Get borrowed book
* @returns {object} resource response
* @param {object} data
*/
export const getBorrowedBook = data =>
  dispatch =>
    axios
      .get(`users/${data.userId}/books?returned=false&bookId=${data.bookId}`, data)
      .then(
        (response) => {
          dispatch(setBorrowedBooks(response.data.data));
          return response;
        },
        errors => errors
      );

/**
* Get borrowed books
* @returns {object} resource response
* @param {object} data
*/
export const getBorrowedBooks = data =>
  dispatch =>
    axios
      .get(
        `users/${data.userId}/books?returned=false`,
        data
      )
      .then(
        (response) => {
          dispatch(setBorrowedBooks(response.data.data));
          return response;
        },
        errors => errors
      );

/**
* Returns borrowed book
* @returns {object} resource response
* @param {object} data
*/
export const returnBorrowedBook = data =>
  dispatch => {
    const updatedAt = moment();
    return axios
      .put(
        `users/${data.userId}/books/${data.borrowedBookId}?bookId=${data.bookId}`,
        data
      )
      .then(
        (response) => {
          /*
          * Wait 1 seconds before emitting event to the client
          */
          setTimeout(() => {
            ioGetNotifications({
              updatedAt,
              notificationType: 'BOOK_RETURNED'
            });
          }, 1000);
          dispatch(setReturnedBook(data));
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
  };
