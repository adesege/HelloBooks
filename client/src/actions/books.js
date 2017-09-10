import axios from 'axios';
<<<<<<< HEAD
import request from 'superagent';
import { SET_BOOKS, ADD_BOOK } from './types';

const API_VERSION = window.API_VERSION;
const CLOUDINARY_UPLOAD_PRESET = 'hellobooks';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/adesege/upload';
=======
import { SET_BOOKS } from './types';

const API_VERSION = window.API_VERSION;
>>>>>>> ad44c0c7b60423889f2e4e3e79b032885217e1d8

export function setBooks(books) { // eslint-disable-line require-jsdoc
  return {
    type: SET_BOOKS,
    books
  };
}

<<<<<<< HEAD
export function addBook(book) { // eslint-disable-line require-jsdoc
  return {
    type: ADD_BOOK,
    book
  };
}
export function getBooks() { // eslint-disable-line require-jsdoc
=======
export default function getBooks() { // eslint-disable-line require-jsdoc
>>>>>>> ad44c0c7b60423889f2e4e3e79b032885217e1d8
  return dispatch => axios.get(`/api/${API_VERSION}/books`);
}

export function saveBooks(data) { // eslint-disable-line require-jsdoc
<<<<<<< HEAD
  return dispatch => axios.post(`/api/${API_VERSION}/books`, data);
}

export function uploadBookCoverPhoto(data) { // eslint-disable-line require-jsdoc
  return dispatch => request.post(CLOUDINARY_UPLOAD_URL)
    .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
    .field('file', data.coverPhotoPath);
=======
  return dispatch => axios.post(`/api/${API_VERSION}/books`, data)
    .then(
      response => response.data.message,
      (error) => { }
    );
>>>>>>> ad44c0c7b60423889f2e4e3e79b032885217e1d8
}
