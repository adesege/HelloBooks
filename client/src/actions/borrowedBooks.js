import axios from 'axios';
import moment from 'moment';
import { ioGetNotifications } from 'assets/js/socket';
import types from './types';
import { addFlashMessage } from './flashMessages';

const { BOOK_BORROWED, GET_BORROWED_BOOKS, BOOK_RETURNED } = types;

/**
 * Action creator for setting borrowed books in application store
 *
 * @param {object} book
 *
 * @returns {object} action creator
*/
export const setBorrowedBooks = book => ({
  type: GET_BORROWED_BOOKS,
  book
});

/**
 * Action creator when book has been borrowed
 *
 * @param {object} book
 *
 * @returns {object} action creator
*/
export const bookBorrowed = book => ({
  type: BOOK_BORROWED,
  isReturned: false,
  book
});

/**
 * Action creator when book has been returned
 *
 * @param {object} book
 *
 * @returns {object} action creator
*/
export const setReturnedBook = book => ({
  type: BOOK_RETURNED,
  isReturned: true,
  book
});

/**
 * Make network request to borrow a book
 *
 * @param {object} data
 *
 * @returns {promise} Axios http promise
*/
export const borrowBook = data =>
  dispatch => {
    const updatedAt = moment();
    return axios
      .post(`users/${data.userId}/books`, data)
      .then(
        (response) => {
          /**
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
 * Make network request to get borrowed books
 *
 * @returns {object} resource response
 *
 * @param {object} data
*/
export const getBorrowedBooks = data =>
  dispatch => {
    const searchQuery = data ? new URLSearchParams(data) : null;
    const toQueryString = data ? searchQuery.toString() : '';
    return axios
      .get(
        `users/${data.userId}/books?${toQueryString}`,
        data
      )
      .then((response) => {
        dispatch(setBorrowedBooks(response.data.data));
        return response;
      })
      .catch((errors) => {
        dispatch(addFlashMessage({
          type: 'error',
          text: errors.response.data.message
        }));
      });
  };

/**
 * Make network request to return borrowed book
 *
 * @param {object} data
 *
 * @returns {object} resource response
*/
export const returnBorrowedBook = data =>
  dispatch => {
    const updatedAt = moment();
    return axios
      .put(
        `users/${data.userId}/books/${data.borrowedBookId}
        ?bookId=${data.bookId}`,
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
