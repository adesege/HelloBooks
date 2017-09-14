import axios from 'axios';
import { SET_BOOKS, ADD_BOOK, BOOK_FETCHED, BOOK_UPDATED, BOOK_DELETED } from './types';
import { addFlashMessage } from './flashMessages';

const API_VERSION = window.API_VERSION;

export function setBooks(books) { // eslint-disable-line require-jsdoc
  return {
    type: SET_BOOKS,
    books
  };
}

/**
 * 
 * 
 * @export
 * @param {any} bookId 
 * @returns  {object} book action
 */
export function bookDeleted(bookId) {
  return {
    type: BOOK_DELETED,
    bookId: bookId.id
  };
}

/**
 * 
 * 
 * @export
 * @param {any} book 
 * @returns  {object} book action
 */
export function bookFetched(book) {
  return {
    type: BOOK_FETCHED,
    book
  };
}

export function addBook(book) { // eslint-disable-line require-jsdoc
  return {
    type: ADD_BOOK,
    book
  };
}


/**
 * 
 * 
 * @export
 * @param {any} book 
 * @returns  {object} bookUpdated Payload
 */
export function bookUpdated(book) {
  return {
    type: BOOK_UPDATED,
    book
  };
}


/**
 * 
 * 
 * @export
 * @returns  {func} promise
 */
export function getBooks() {
  return dispatch => axios.get(`/api/${API_VERSION}/books`);
}


/**
 * 
 * 
 * @export
 * @param {any} data 
 * @returns  {func} promise
 */
export function getBook(data) {
  return dispatch => axios.get(`/api/${API_VERSION}/books/${data.id}`).then(
    (book) => {
      dispatch(bookFetched(book.data.message[0]));
    },
    errors => errors
  );
}

export function saveBooks(data) { // eslint-disable-line require-jsdoc
  return (dispatch) => {
    const newData = { ...data, coverPhotoPath: '' };
    return axios.post(`/api/${API_VERSION}/books`, newData);
  };
}

/**
 * 
 * 
 * @export
 * @param {any} data 
 * @returns {func} promise
 */
export const updateBookCover = data => dispatch => axios.put(`/api/${API_VERSION}/books/${data.id}?fields=coverPhotoPath`, data);

/**
 * 
 * 
 * @export
 * @param {any} data 
 * @returns {func} promise
 */
export const updateBook = data => (dispatch) => {
  if (data.coverPhotoPath.match(/^data:image/)) { delete data.coverPhotoPath; }
  return axios.put(`/api/${API_VERSION}/books/${data.id}`, data).then(
    (response) => {
      dispatch(bookUpdated(response.data));
      return response;
    },
    errors => errors
  );
};

/**
 * 
 * 
 * @export
 * @param {any} data 
 * @returns {func} promise
 */
export const deleteBook = data =>
  dispatch => axios.delete(`/api/${API_VERSION}/books/${data.id}`, data)
    .then(
      (response) => {
        dispatch(bookDeleted(data));
        dispatch(addFlashMessage({
          type: 'success',
          text: response.data
        }));
        return response;
      },
      errors => errors
    );
