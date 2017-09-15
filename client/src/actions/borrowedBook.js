import axios from 'axios';
import { BOOK_BORROWED, BORROWED_BOOK, BOOK_RETURNED } from './types';
import { addFlashMessage } from './flashMessages';

const API_VERSION = window.API_VERSION;

export function borrowedBook(book) { // eslint-disable-line require-jsdoc
  return {
    type: BORROWED_BOOK,
    book
  };
}

export function bookBorrowed(book) { // eslint-disable-line require-jsdoc
  return {
    type: BOOK_BORROWED,
    isReturned: false,
    book
  };
}

export function returnedBook(book) { // eslint-disable-line require-jsdoc
  return {
    type: BOOK_RETURNED,
    isReturned: true,
    book
  };
}

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
          dispatch(borrowedBook(response.data.message[0]));
          return response;
        },
        errors => errors
      );

export const returnBorrowedBook = data =>
  dispatch =>
    axios
      .put(`/api/${API_VERSION}/users/${data.userId}/books/${data.borrowedBookId}?bookId=${data.bookId}`, data)
      .then(
        (response) => {
          dispatch(returnedBook(data));
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

