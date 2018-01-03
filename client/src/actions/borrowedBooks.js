import axios from 'axios';
import moment from 'moment';
import { ioGetNotifications } from 'assets/js/socket';
import types from './types';
import { addFlashMessage } from './flashMessages';

const { BOOK_BORROWED, GET_BORROWED_BOOKS, BOOK_RETURNED } = types;

/**
 * Action creator for setting borrowed books in application store
 *
 * @param {object} book - borrowed book object
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
 * @param {object} book - book object when it has been borrowed
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
 * @param {object} book - returned book object
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
 * @param {object} options - options for borrowing a book
 *
 * @returns {promise} Axios http promise
*/
export const borrowBook = options =>
  dispatch => {
    const updatedAt = moment();
    return axios
      .post(`users/${options.userId}/books`, options)
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
          options.borrowedBookId = response.data.id; // set the borrowedBook Id
          dispatch(bookBorrowed(options));
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
 * @param {object} options - options for getting borrowed books
*/
export const getBorrowedBooks = options =>
  dispatch => {
    const searchQuery = options ? new URLSearchParams(options) : null;
    const toQueryString = options ? searchQuery.toString() : '';
    return axios
      .get(
        `users/${options.userId}/books?${toQueryString}`,
        options
      )
      .then((response) => {
        dispatch(setBorrowedBooks(response.data.books));
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
 * @param {object} options - options for returning borrowed book
 *
 * @returns {object} resource response
*/
export const returnBorrowedBook = options =>
  dispatch => {
    const updatedAt = moment();
    return axios
      .put(
        `users/${options.userId}/books/${options.borrowedBookId}
        ?bookId=${options.bookId}`,
        options
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
          dispatch(setReturnedBook(options));
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
