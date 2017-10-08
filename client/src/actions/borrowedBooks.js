import axios from 'axios';
import types from './types';
import { addFlashMessage } from './flashMessages';

const API_VERSION = window.API_VERSION;
const { BOOK_BORROWED, GET_BORROWED_BOOKS, BOOK_RETURNED } = types;

export const setBorrowedBooks = book => ({
  type: GET_BORROWED_BOOKS,
  book
});

export const bookBorrowed = book => ({
  type: BOOK_BORROWED,
  isReturned: false,
  book
});

export const setReturnedBook = book => ({
  type: BOOK_RETURNED,
  isReturned: true,
  book
});

export const borrowBook = data =>
  dispatch =>
    axios
      .post(`/api/${API_VERSION}/users/${data.userId}/books`, data)
      .then(
        (response) => {
          data.borrowedBookId = response.data.id;
          dispatch(bookBorrowed(data));
          dispatch(addFlashMessage({
            type: 'success',
            text: response.data
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

export const getBorrowedBook = data =>
  dispatch =>
    axios
      .get(`/api/${API_VERSION}/users/${data.userId}/books?returned=false&bookId=${data.bookId}`, data)
      .then(
        (response) => {
          dispatch(setBorrowedBooks(response.data.data));
          return response;
        },
        errors => errors
      );

export const getBorrowedBooks = data =>
  dispatch =>
    axios
      .get(`/api/${API_VERSION}/users/${data.userId}/books?returned=false`,
        data)
      .then(
        (response) => {
          dispatch(setBorrowedBooks(response.data.data));
          return response;
        },
        errors => errors
      );

export const returnBorrowedBook = data =>
  dispatch =>
    axios
      .put(`/api/${API_VERSION}/users/${data.userId}/books/${data.borrowedBookId}?bookId=${data.bookId}`,
        data)
      .then(
        (response) => {
          dispatch(setReturnedBook(data));
          dispatch(addFlashMessage({
            type: 'success',
            text: response.data
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

