import axios from 'axios';
import { SET_BOOKS } from './types';

const API_VERSION = window.API_VERSION;

export function setBooks(books) { // eslint-disable-line require-jsdoc
  return {
    type: SET_BOOKS,
    books
  };
}

export default function getBooks() { // eslint-disable-line require-jsdoc
  return dispatch => axios.get(`/api/${API_VERSION}/books`);
}

export function saveBooks(data) { // eslint-disable-line require-jsdoc
  return dispatch => axios.post(`/api/${API_VERSION}/books`, data)
    .then(
      response => response.data.message,
      (error) => { }
    );
}
